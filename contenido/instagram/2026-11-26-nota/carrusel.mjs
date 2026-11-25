// Carrusel "¿Qué nota le pondría ChatGPT a tu web?" (1080x1350, JPEG). Misma estética que 2026-11-25-aeo-senales.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

const DIR = '/home/claude/carrusel';            // fuentes + andres.webp
const OUT = process.argv[2] || '/home/claude/carrusel/nota';
mkdirSync(OUT, { recursive: true });
const TOTAL = 6;

const css = `
@font-face{font-family:Display;src:url(file://${DIR}/bricolage-grotesque.woff2);font-weight:200 800}
@font-face{font-family:Geist;src:url(file://${DIR}/Geist-Regular.woff2);font-weight:400}
@font-face{font-family:Geist;src:url(file://${DIR}/Geist-SemiBold.woff2);font-weight:600}
@font-face{font-family:Mono;src:url(file://${DIR}/GeistMono-Regular.woff2)}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;overflow:hidden;background:#05060d;color:#eef1f5;font-family:Geist,sans-serif;position:relative}
.aurora{position:absolute;inset:-20%;background:
 radial-gradient(38% 30% at 20% 18%,rgba(63,91,255,.55),transparent 70%),
 radial-gradient(34% 28% at 85% 30%,rgba(139,92,246,.45),transparent 70%),
 radial-gradient(40% 32% at 55% 92%,rgba(34,211,238,.25),transparent 70%);filter:blur(50px)}
.red{position:absolute;inset:0;opacity:.35;background-image:radial-gradient(circle at 1.5px 1.5px,rgba(142,166,255,.4) 1.5px,transparent 0);background-size:34px 34px;
 -webkit-mask-image:radial-gradient(ellipse at 50% 35%,#000 30%,transparent 80%)}
.marco{position:absolute;inset:0;padding:96px 88px 88px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;font-family:Mono;font-size:26px;color:#8ea6ff}
.chip{display:inline-flex;align-items:center;gap:12px;border:1.5px solid rgba(142,166,255,.4);background:rgba(63,91,255,.16);border-radius:999px;padding:10px 22px;font-family:Geist;font-weight:600;font-size:26px;color:#dce3ff}
.punto{width:12px;height:12px;border-radius:99px;background:#22d3ee;box-shadow:0 0 16px #22d3ee}
h1,h2{font-family:Display;font-weight:800;letter-spacing:-.02em;line-height:.98}
h1{font-size:118px}
h2{font-size:84px}
.deg{background:linear-gradient(100deg,#fff 10%,#b9c7ff 45%,#a78bfa 72%,#67e8f9 98%);-webkit-background-clip:text;color:transparent}
p.txt{font-size:40px;line-height:1.38;color:#c9d0de;max-width:900px}
p.txt b{color:#fff}
.term{font-family:Mono;font-size:30px;color:#8ea6ff}
.term b{color:#22d3ee;font-weight:400}
.pie{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:28px;color:#8f9ab0}
.flecha{font-family:Geist;font-weight:600;color:#dce3ff}
.caja{border:1.5px solid rgba(142,166,255,.28);background:rgba(255,255,255,.04);border-radius:28px;padding:30px 36px}
.preg{display:flex;align-items:center;gap:26px;padding:34px 0;border-bottom:1.5px solid rgba(142,166,255,.14)}
.preg:last-child{border-bottom:0}
.preg .n{font-family:Mono;font-size:28px;color:#8ea6ff;width:44px}
.preg .q{font-size:42px;color:#fff;flex:1;line-height:1.2}
.preg .q small{display:block;font-size:29px;color:#9aa5bb;margin-top:6px}
.preg .pts{font-family:Display;font-weight:800;font-size:44px;background:linear-gradient(120deg,#8ea6ff,#a78bfa,#67e8f9);-webkit-background-clip:text;color:transparent}
.nota{display:flex;align-items:center;gap:34px}
.nota .big{font-family:Display;font-weight:800;font-size:150px;line-height:1;width:250px}
.mala{background:linear-gradient(120deg,#ff6b6b,#f472b6);-webkit-background-clip:text;color:transparent}
.buena{background:linear-gradient(120deg,#3f5bff,#8b5cf6 55%,#22d3ee);-webkit-background-clip:text;color:transparent}
.nota .d{font-size:34px;color:#c9d0de;line-height:1.3}
.nota .d b{color:#fff;display:block;font-size:40px;margin-bottom:6px}
.barra{height:22px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:20px}
.barra i{display:block;height:100%;border-radius:99px}
.bandas{display:flex;gap:12px;margin-top:40px}
.bandas span{flex:1;text-align:center;border-radius:16px;padding:16px 6px;font-size:26px;color:#dce3ff;background:rgba(255,255,255,.05);border:1.5px solid rgba(142,166,255,.2)}
.bandas b{display:block;font-family:Display;font-size:40px;color:#fff}
.boton{display:inline-block;border-radius:30px;padding:30px 48px;font-family:Geist;font-weight:600;font-size:40px;color:#fff;
 background:linear-gradient(110deg,#3f5bff,#7c3aed 55%,#0891b2);box-shadow:0 20px 70px -15px rgba(99,102,241,.8)}
.palabra{display:inline-block;font-family:Display;font-weight:800;font-size:150px;letter-spacing:.02em;padding:6px 44px 14px;border-radius:36px;border:3px solid rgba(142,166,255,.55);background:rgba(63,91,255,.18);box-shadow:0 0 90px rgba(99,102,241,.45)}
.avatar{width:150px;height:150px;border-radius:999px;padding:6px;background:conic-gradient(from 30deg,#3f5bff,#8b5cf6,#22d3ee,#3f5bff);box-shadow:0 0 60px rgba(99,102,241,.6)}
.avatar img{width:100%;height:100%;border-radius:999px;object-fit:cover;object-position:top}
`;

const marco = (n, cuerpo, { flecha = true } = {}) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="aurora"></div><div class="red"></div>
<div class="marco">
  <div class="top"><span class="chip"><span class="punto"></span>Andrés AI Studio</span><span>${String(n).padStart(2, '0')}/${String(TOTAL).padStart(2, '0')}</span></div>
  ${cuerpo}
  <div class="pie"><span>@andresrendon.ai</span>${flecha ? '<span class="flecha">Desliza →</span>' : '<span class="flecha">Link en la bio ↗</span>'}</div>
</div></body></html>`;

const preg = (n, q, sub, pts) => `<div class="preg"><span class="n">${n}</span><span class="q">${q}<small>${sub}</small></span><span class="pts">${pts}</span></div>`;

const slides = [
  marco(1, `
    <div style="margin-top:150px" class="term">› poniendo nota a tu web<b>…</b></div>
    <h1 style="margin-top:36px" class="deg">¿Qué nota le pondría ChatGPT a tu web?</h1>
    <p class="txt" style="margin-top:48px">Antes de recomendarte, una IA se hace <b>8 preguntas</b> sobre tu web. Mi auditor se las hace también, y le pone nota de 0 a 100.</p>`),
  marco(2, `
    <h2 style="margin-top:90px">Lo primero: <span class="deg">¿puede leerte?</span></h2>
    <div class="caja" style="margin-top:56px">
      ${preg('01', '¿Puede entrar?', 'Que tu robots.txt o tu cortafuegos no echen a sus robots', '20')}
      ${preg('02', '¿Puede leerla sin JavaScript?', 'ChatGPT y Perplexity no ejecutan JavaScript; Google sí', '20')}
    </div>
    <p class="txt" style="margin-top:46px">Son <b>40 de los 100 puntos</b>. Si fallas aquí, lo demás casi da igual.</p>`),
  marco(3, `
    <h2 style="margin-top:90px">Después: <span class="deg">¿te entiende?</span></h2>
    <div class="caja" style="margin-top:56px">
      ${preg('03', '¿Sabe qué eres y qué vendes?', 'Datos estructurados: la ficha que leen las máquinas', '18')}
      ${preg('04', '¿Puede citarte?', 'Párrafos que responden claro: precios, zona, horarios', '15')}
    </div>
    <p class="txt" style="margin-top:46px">Si la IA tiene que adivinar tu sector o tu zona, <b>recomienda a otro</b>.</p>`),
  marco(4, `
    <h2 style="margin-top:90px">Y al final: <span class="deg">¿se fía de ti?</span></h2>
    <div class="caja" style="margin-top:50px">
      ${preg('05', '¿Sabe quién eres?', 'Nombre, contacto y aviso legal coherentes', '10')}
      ${preg('06', '¿Está al día?', 'Fechas visibles de publicación y actualización', '7')}
      ${preg('07', '¿Está bien indexada?', 'La base del SEO en orden', '5')}
      ${preg('08', '¿Responde rápido?', 'Que no se canse esperando', '5')}
    </div>`),
  marco(5, `
    <h2 style="margin-top:90px">Dos webs, <span class="deg">dos notas</span></h2>
    <div class="caja" style="margin-top:50px">
      <div class="nota"><span class="big mala">25</span><span class="d"><b>Web hecha solo con JavaScript</b>Web de ejemplo. Una persona la ve perfecta; la IA lee 0 palabras.</span></div>
      <div class="barra"><i style="width:25%;background:linear-gradient(90deg,#ff6b6b,#f472b6)"></i></div>
    </div>
    <div class="caja" style="margin-top:28px">
      <div class="nota"><span class="big buena">95</span><span class="d"><b>Avancés Campus</b>Cliente real. Pasó de 92 a 95 tras un parche.</span></div>
      <div class="barra"><i style="width:95%;background:linear-gradient(90deg,#3f5bff,#8b5cf6,#22d3ee)"></i></div>
    </div>
    <div class="bandas"><span><b>85+</b>excelente</span><span><b>70+</b>bueno</span><span><b>50+</b>mejorable</span><span><b>&lt;50</b>crítico</span></div>`),
  marco(6, `
    <div style="margin-top:80px" class="avatar"><img src="file://${DIR}/andres.webp"></div>
    <p class="txt" style="margin-top:44px;font-size:46px">¿Quieres saber la tuya? Comenta</p>
    <div style="margin-top:26px"><span class="palabra"><span class="deg">NOTA</span></span></div>
    <p class="txt" style="margin-top:40px">y te digo <b>tu nota de 0 a 100</b> y qué arreglar primero. Gratis.</p>
    <div style="margin-top:44px"><span class="boton">andresrendon.com/auditoria-aeo</span></div>`, { flecha: false }),
];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [i, html] of slides.entries()) {
  const f = `${OUT}/slide-${i + 1}.html`;
  writeFileSync(f, html);
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/nota-${i + 1}.jpg`, type: 'jpeg', quality: 90 });
}
await b.close();
console.log('ok', slides.length);
