// Graba el auditor en acción (capturas JPEG con su instante) para montar el reel.
import { chromium } from '/home/claude/aeo-auditor/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = '/home/claude/reel/frames';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-proxy-server'] });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

// La web de ejemplo (hecha solo con JavaScript) se muestra como "tuweb-ejemplo.com"
await p.route('**/api/auditar', async (route) => {
  const r = await fetch('http://localhost:8788/api/auditar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: 'http://127.0.0.1:8093/' }) });
  const d = await r.json();
  d.dominio = 'tuweb-ejemplo.com'; d.url = 'https://tuweb-ejemplo.com/'; d.cache = false;
  await new Promise((s) => setTimeout(s, 5200)); // que se vean los pasos del análisis
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(d) });
});

await p.goto('http://localhost:8788/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
// Colores de la marca nueva (azul, violeta, cian) para que el reel cuadre con @andresrendon.ai
await p.addStyleTag({ content: `
  :root{--f:#05060d;--f2:#0d1020;--f3:#141832;--a:#8ea6ff;--l:#232a4a}
  body{background:radial-gradient(60% 40% at 20% 10%,rgba(63,91,255,.35),transparent 70%),radial-gradient(50% 35% at 90% 30%,rgba(139,92,246,.3),transparent 70%),#05060d}
  .btn{background:linear-gradient(110deg,#3f5bff,#7c3aed 55%,#0891b2)!important;color:#fff!important}
  .hero h1 em{background:linear-gradient(100deg,#b9c7ff,#a78bfa 60%,#67e8f9);-webkit-background-clip:text;color:transparent}
  .chip{color:#8ea6ff} .barra i{background:linear-gradient(90deg,#3f5bff,#8b5cf6,#22d3ee)}
  .lead{background:linear-gradient(180deg,#141a3a,#0d1020)!important;border-color:#2e3770!important}
  form.buscar{border-color:#2e3770}` });

const frames = [];
let t0 = Date.now();
let n = 0;
const foto = async () => {
  const f = `${OUT}/f${String(n++).padStart(4, '0')}.jpg`;
  await p.screenshot({ path: f, type: 'jpeg', quality: 92 });
  frames.push({ f, t: (Date.now() - t0) / 1000 });
};
const grabar = async (seg) => { const fin = Date.now() + seg * 1000; while (Date.now() < fin) await foto(); };

await grabar(0.6);
await p.click('#url');
for (const c of 'tuweb-ejemplo.com') { await p.keyboard.type(c); await foto(); await p.waitForTimeout(40); }
await grabar(0.4);
await p.click('#b-buscar');
await p.evaluate(() => document.querySelector('#cargando').scrollIntoView({ block: 'center' }));
await grabar(5.4);
await p.waitForSelector('#resultado.on');
const top = await p.evaluate(() => document.querySelector('#resultado').getBoundingClientRect().top + window.scrollY - 8);
await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
await grabar(2.6); // la nota, quieta
// Bajar despacio hasta los fallos principales
for (let y = 0; y <= 470; y += 18) { await p.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), top + y); await foto(); }
await grabar(2.2);
await foto();

const lista = frames.map((fr, i) => `file '${fr.f}'\nduration ${((frames[i + 1]?.t ?? fr.t + 0.5) - fr.t).toFixed(3)}`).join('\n') + `\nfile '${frames.at(-1).f}'\n`;
writeFileSync('/home/claude/reel/frames.txt', lista);
console.log('capturas:', frames.length, 'duración:', frames.at(-1).t.toFixed(1), 's');
await b.close();
