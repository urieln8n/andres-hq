// Lee proyectos.json y genera PROYECTOS.md (para GitHub) y mapa.html (para abrir en el navegador o el móvil).
// Uso: node scripts/generar.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const datos = JSON.parse(readFileSync(join(raiz, 'proyectos.json'), 'utf8'));
const orden = Object.keys(datos.estados);
const porEstado = (e) => datos.proyectos.filter((p) => p.estado === e);

const enFoco = porEstado('foco').length;
const aviso = enFoco > datos.reglas.max_activos
  ? `\n> ⚠️ Tienes ${enFoco} proyectos en foco y el máximo es ${datos.reglas.max_activos}. Aparca alguno.\n`
  : '';

// ---------- PROYECTOS.md ----------
const repoLink = (r) => {
  if (!r) return '—';
  return r.split('·').map((s) => {
    const m = s.trim().match(/^([\w.-]+\/[\w.-]+)(.*)$/);
    return m ? `[${m[1]}](https://github.com/${m[1]})${m[2]}` : s.trim();
  }).join(' · ');
};
let md = `# Mapa de proyectos de Andrés\n\nActualizado: **${datos.actualizado}** · ${datos.proyectos.length} proyectos · ${enFoco}/${datos.reglas.max_activos} en foco\n${aviso}\n> Este archivo se genera solo desde \`proyectos.json\`. No lo edites a mano: edita el JSON y ejecuta \`node scripts/generar.mjs\`.\n`;
for (const e of orden) {
  const lista = porEstado(e);
  if (!lista.length) continue;
  md += `\n## ${datos.estados[e]}\n\n| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |\n|---|---|---|---|---|\n`;
  for (const p of lista) {
    const nombre = p.url ? `[${p.nombre}](${p.url})` : p.nombre;
    const donde = [p.donde_esta, p.publicar].filter(Boolean).join('<br>');
    md += `| **${nombre}** | ${p.que_es} | ${repoLink(p.repo)} | ${donde} | ${p.siguiente || '—'} |\n`;
  }
}
writeFileSync(join(raiz, 'PROYECTOS.md'), md);

// ---------- mapa.html ----------
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const colores = { foco: '#ff5a36', clientes: '#3aa8ff', base: '#8b7bff', aparcado: '#7a8794', muerto: '#4a4f55' };
const tarjeta = (p) => `
      <article class="card" style="--c:${colores[p.estado]}">
        <div class="tipo">${esc(p.tipo)}</div>
        <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.nombre)} ↗</a>` : esc(p.nombre)}</h3>
        <p>${esc(p.que_es)}</p>
        <dl>
          ${p.repo ? `<dt>Repo</dt><dd>${esc(p.repo)}</dd>` : ''}
          <dt>Dónde</dt><dd>${esc(p.donde_esta)}</dd>
          ${p.publicar ? `<dt>Publicar</dt><dd>${esc(p.publicar)}</dd>` : ''}
        </dl>
        <div class="next">→ ${esc(p.siguiente || '—')}</div>
      </article>`;
const columnas = orden.map((e) => {
  const lista = porEstado(e);
  if (!lista.length) return '';
  return `
    <section class="col">
      <h2>${esc(datos.estados[e])} <span>${lista.length}</span></h2>${lista.map(tarjeta).join('')}
    </section>`;
}).join('');

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mapa de proyectos · Andrés</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0e1013;color:#e9ecef}
header{padding:28px 20px 8px;max-width:1500px;margin:auto}h1{margin:0 0 6px;font-size:26px}
.meta{color:#9aa4ad;font-size:14px}.aviso{background:#3a1d14;border:1px solid #ff5a36;padding:10px 14px;border-radius:10px;margin-top:12px}
main{display:flex;gap:16px;overflow-x:auto;padding:16px 20px 40px;max-width:1500px;margin:auto;align-items:flex-start}
.col{flex:0 0 300px}.col h2{font-size:15px;margin:0 0 10px;color:#cfd5da}.col h2 span{color:#7a8794;font-weight:400}
.card{background:#171a1f;border:1px solid #23272e;border-left:4px solid var(--c);border-radius:10px;padding:12px 14px;margin-bottom:10px}
.tipo{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--c)}
h3{margin:4px 0 6px;font-size:16px}h3 a{color:#fff;text-decoration:none}h3 a:hover{text-decoration:underline}
p{margin:0 0 8px;font-size:13px;color:#b9c1c8;line-height:1.4}
dl{margin:0 0 8px;display:grid;grid-template-columns:auto 1fr;gap:2px 8px;font-size:12px}dt{color:#7a8794}dd{margin:0;color:#cfd5da;word-break:break-word}
.next{font-size:13px;background:#1f242b;border-radius:6px;padding:6px 8px;color:#fff}
@media(max-width:700px){main{flex-direction:column}.col{flex:auto;width:100%}}
</style></head><body>
<header><h1>Mapa de proyectos</h1>
<div class="meta">Actualizado ${esc(datos.actualizado)} · ${datos.proyectos.length} proyectos · ${enFoco}/${datos.reglas.max_activos} en foco · Regla: ${esc(datos.reglas.nota)}</div>
${enFoco > datos.reglas.max_activos ? `<div class="aviso">⚠️ Tienes ${enFoco} proyectos en foco. Aparca alguno.</div>` : ''}
</header>
<main>${columnas}
</main></body></html>`;
writeFileSync(join(raiz, 'mapa.html'), html);
writeFileSync(join(raiz, 'index.html'), html); // para Cloudflare Pages
console.log(`OK: ${datos.proyectos.length} proyectos → PROYECTOS.md y mapa.html (${enFoco} en foco)`);
