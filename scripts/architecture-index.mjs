import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const sorted = values => values.slice().sort((a, b) => cmp(JSON.stringify(a), JSON.stringify(b)));
const fail = message => { throw new Error(message); };
const check = (condition, message) => { if (!condition) fail(message); };
const unique = (values, label) => check(new Set(values).size === values.length, 'Duplicate ' + label);
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const path = resolve(dir, entry.name);
  return entry.isDirectory() ? walk(path) : entry.isFile() && entry.name === 'artefact.json' ? [path] : [];
});
const records = walk(resolve(root, 'docs')).map(file => ({
  path: relative(root, file).split(sep).join('/'),
  record: JSON.parse(readFileSync(file, 'utf8'))
})).sort((a, b) => cmp(a.record.id, b.record.id));
const ids = new Map(records.map(({ record }) => [record.id, record]));
unique(records.map(({ record }) => record.id), 'artefact ID');
const inventory = readFileSync(resolve(root, 'docs/catalogue.md'), 'utf8');
const inventoryRows = [...inventory.matchAll(/^\| \x60([^\x60]+)\x60 \| ([^|]+) \| ([^|]+) \| \[Design\]\(([^)]+)\) \| \[Descriptor\]\(([^)]+)\) \|[ \t]*$/gm)];
check(inventoryRows.length > 0, 'Canonical inventory not found');
unique(inventoryRows.map(row => row[1]), 'inventory ID');
check(inventoryRows.length === records.length, 'Inventory/descriptor count mismatch');
for (const [, id, kind, classification, designPath, descriptorPath] of inventoryRows) {
  check(ids.has(id), 'Missing descriptor: ' + id);
  const r = ids.get(id);
  check(r.kind === kind.trim().toLowerCase() && r.classification === classification.trim() && r.designRecord === 'docs/' + designPath && records.find(({ record }) => record.id === id).path === 'docs/' + descriptorPath, 'Inventory mismatch: ' + id);
}
const allNames = records.flatMap(({ record: r }) => [r.id, ...(r.aliases ?? [])]);
unique(allNames, 'canonical ID or alias');
const adrArg = args.indexOf('--governing-root');
check(adrArg < 0 || args[adrArg + 1], 'Missing governing root');
const adrDir = resolve(adrArg < 0 ? root : args[adrArg + 1], 'docs/decisions');
let accepted;
if (existsSync(adrDir)) {
  accepted = new Set(readdirSync(adrDir).filter(name => /^ADR-\d{4}-.*\.md$/.test(name))
    .filter(name => /^\*\*Status:\*\* Accepted\b/m.test(readFileSync(resolve(adrDir, name), 'utf8')))
    .map(name => name.slice(0, 8)));
} else if (adrArg >= 0) fail('Governing ADR directory not found');
else console.warn('Governing ADR validation deferred: supply --governing-root');
const dirs = { architecture:'architecture', capability:'capabilities', composition:'compositions', infrastructure:'infrastructure', library:'libraries', presentation:'presentation', service:'services', adapter:'adapters' };
const types = new Set(['composition','specialisation','framework-extension','event-publication','event-subscription','information-exchange','ownership','interface-consumption']);
for (const { path, record: r } of records) {
  check(r.profile === 'conceptual' && r.schemaVersion === 1, 'Invalid conceptual profile: ' + r.id);
  check(path === 'docs/' + dirs[r.kind] + '/' + r.id + '/artefact.json', 'Incorrect descriptor path: ' + r.id);
  check(existsSync(resolve(root, r.designRecord)), 'Missing design record: ' + r.id);
  check(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(r.id), 'Invalid canonical ID: ' + r.id);
  unique(r.provides.map(p => p.id), r.id + ' interface');
  unique(r.requires.map(q => [q.id, q.interface ?? '', q.scope ?? ''].join('|')), r.id + ' requirement');
  unique(r.relationships.map(e => [e.target, e.type, e.interface ?? ''].join('|')), r.id + ' relationship');
  for (const q of r.requires) {
    check(ids.has(q.id) && q.id !== r.id, 'Unknown/self requirement: ' + r.id + ' -> ' + q.id);
    check(typeof q.optional === 'boolean' && (!q.optional || !!q.absenceMode?.trim()), 'Missing optional absence mode: ' + r.id + ' -> ' + q.id);
    check(!('phase' in q), 'Implementation phase in conceptual requirement: ' + r.id);
    check(!q.interface || ids.get(q.id).provides.some(p => p.id === q.interface), 'Unknown required interface: ' + r.id + ' -> ' + q.id);
  }
  for (const e of r.relationships) {
    check(ids.has(e.target) && e.target !== r.id && types.has(e.type), 'Invalid relationship: ' + r.id + ' -> ' + e.target);
    if (e.interface) {
      const owner = e.type === 'event-publication' ? r : ids.get(e.target);
      check(owner.provides.some(p => p.id === e.interface), 'Unknown relationship interface: ' + r.id + ' -> ' + e.target);
    }
  }
  for (const u of r.unresolvedRelationships) if (u.target) check(ids.has(u.target), 'Unknown unresolved target: ' + r.id);
  if (accepted) for (const adr of r.governingDecisions) check(accepted.has(adr), 'Unknown/unaccepted ADR: ' + r.id + ' -> ' + adr);
}
function acyclic(label, neighbours) {
  const visiting = new Set(), done = new Set();
  function visit(id, trail) {
    if (visiting.has(id)) fail(label + ' cycle: ' + [...trail, id].join(' -> '));
    if (done.has(id)) return;
    visiting.add(id);
    for (const target of neighbours(ids.get(id))) visit(target, [...trail, id]);
    visiting.delete(id); done.add(id);
  }
  for (const id of ids.keys()) visit(id, []);
}
// Composition/specialisation cycles are distinct from host-supplied contract
// cooperation. Actual software dependency cycles are checked at implementation.
acyclic('Composition/specialisation', r => r.relationships.filter(e => ['composition','specialisation'].includes(e.type)).map(e => e.target));
const nodes = records.map(({ path, record: r }) => ({
  id:r.id, kind:r.kind, classification:r.classification, description:r.description,
  descriptor:path, designRecord:r.designRecord,
  ...(r.aliases?.length ? {aliases:r.aliases.slice().sort(cmp)} : {}),
  provides:r.provides.map(p => p.id).sort(cmp),
  requires:sorted(r.requires.map(q => ({id:q.id,optional:q.optional,...(q.interface?{interface:q.interface}:{}),...(q.scope?{scope:q.scope}:{})}))),
  outgoing:sorted(r.relationships.map(e => ({target:e.target,type:e.type,...(e.interface?{interface:e.interface}:{})}))),
  incoming:sorted(records.flatMap(({record:o}) => o.relationships.filter(e => e.target===r.id).map(e => ({source:o.id,type:e.type,...(e.interface?{interface:e.interface}:{})})))),
  requiredBy:sorted(records.flatMap(({record:o}) => o.requires.filter(q => q.id===r.id).map(q => ({id:o.id,optional:q.optional,...(q.interface?{interface:q.interface}:{}),...(q.scope?{scope:q.scope}:{})}))))
}));
const output = '{\n  "schemaVersion": 1,\n  "profile": "conceptual",\n  "artefacts": [\n' + nodes.map(n => '    ' + JSON.stringify(n)).join(',\n') + '\n  ]\n}\n';
const path = resolve(root, 'docs/architecture-index.json');
if (args.includes('--write')) writeFileSync(path, output);
else if (args.includes('--check')) check(existsSync(path) && readFileSync(path,'utf8') === output, 'Architecture index is stale; regenerate with --write');
else fail('Use --write or --check');
console.log('Architecture index: ' + records.length + ' conceptual artefacts.');
