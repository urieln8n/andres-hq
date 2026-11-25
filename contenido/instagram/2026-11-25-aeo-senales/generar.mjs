// Genera las diapositivas del carrusel (1080x1350, JPEG) con la estética de andresrendon.com/instagram.
import { chromium } from '/home/claude/aeo-auditor/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';

const DIR = '/home/claude/carrusel';
const TOTAL = 7;

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
h1{font-size:124px}
h2{font-size:92px}
.deg{background:linear-gradient(100deg,#fff 10%,#b9c7ff 45%,#a78bfa 72%,#67e8f9 98%);-webkit-background-clip:text;color:transparent}
.num{font-family:Display;font-weight:800;font-size:170px;line-height:1;background:linear-gradient(120deg,#3f5bff,#8b5cf6 55%,#22d3ee);-webkit-background-clip:text;color:transparent}
p.txt{font-size:42px;line-height:1.38;color:#c9d0de;max-width:880px}
p.txt b{color:#fff}
.term{font-family:Mono;font-size:30px;color:#8ea6ff}
.term b{color:#22d3ee;font-weight:400}
.pie{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:28px;color:#8f9ab0}
.flecha{font-family:Geist;font-weight:600;color:#dce3ff}
.caja{border:1.5px solid rgba(142,166,255,.28);background:rgba(255,255,255,.04);border-radius:28px;padding:34px 38px}
.barra{height:30px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:14px}
.barra i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#3f5bff,#8b5cf6,#22d3ee)}
.etq{font-size:30px;color:#c9d0de;display:flex;justify-content:space-between}
.boton{display:inline-block;border-radius:30px;padding:34px 52px;font-family:Geist;font-weight:600;font-size:44px;color:#fff;
 background:linear-gradient(110deg,#3f5bff,#7c3aed 55%,#0891b2);box-shadow:0 20px 70px -15px rgba(99,102,241,.8)}
.avatar{width:170px;height:170px;border-radius:999px;padding:6px;background:conic-gradient(from 30deg,#3f5bff,#8b5cf6,#22d3ee,#3f5bff);box-shadow:0 0 60px rgba(99,102,241,.6)}
.avatar img{width:100%;height:100%;border-radius:999px;object-fit:cover;object-position:top}
`;

const marco = (n, cuerpo, { flecha = true } = {}) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="aurora"></div><div class="red"></div>
<div class="marco">
  <div class="top"><span class="chip"><span class="punto"></span>Andrés AI Studio</span><span>${String(n).padStart(2, '0')}/${String(TOTAL).padStart(2, '0')}</span></div>
  ${cuerpo}
  <div class="pie"><span>@andresrendon.ai</span>${flecha ? '<span class="flecha">Desliza →</span>' : '<span class="flecha">Link en la bio ↗</span>'}</div>
</div></body></html>`;

const senal = (n, i, titulo, texto, extra = '') => marco(n, `
  <div style="margin-top:110px"><div class="num">${i}</div></div>
  <h2 style="margin-top:26px">${titulo}</h2>
  <p class="txt" style="margin-top:38px">${texto}</p>
  ${extra}`);

const slides = [
  marco(1, `
    <div style="margin-top:150px" class="term">› analizando tu web con IA<b>…</b></div>
    <h1 style="margin-top:36px" class="deg">¿Te puede recomendar ChatGPT?</h1>
    <p class="txt" style="margin-top:48px">5 señales de que tu web es <b>invisible para la IA</b> (y aún no lo sabes).</p>`),
  senal(2, '1', 'Tu web está hecha con JavaScript', 'Google ejecuta JavaScript. <b>ChatGPT, Perplexity y Claude no.</b> Si tus servicios y precios se cargan así, para la IA tu web está vacía.', `
    <div class="caja" style="margin-top:56px">
      <div class="etq"><span>Lo que ve una persona</span><span>100%</span></div><div class="barra"><i style="width:100%"></i></div>
      <div class="etq" style="margin-top:30px"><span>Lo que puede leer la IA</span><span>casi nada</span></div><div class="barra"><i style="width:6%"></i></div>
    </div>`),
  senal(3, '2', 'Bloqueas a sus robots sin saberlo', 'Un robots.txt mal hecho o un cortafuegos pueden dejar fuera a <b>OAI-SearchBot o PerplexityBot</b>. Sin ellos, no apareces en sus respuestas.'),
  senal(4, '3', 'No dices qué eres ni qué vendes', 'Sin <b>datos estructurados</b> (la ficha que leen las máquinas), la IA tiene que adivinar tu sector, tu zona y tus servicios. Y cuando duda, no te recomienda.'),
  senal(5, '4', 'Nada se puede citar', 'La IA cita párrafos que responden algo concreto: <b>«¿Cuánto cuesta…?»</b>, <b>«¿Dónde estáis?»</b>. Si tu web no lo responde claro, cita a otro.'),
  senal(6, '5', 'Sin fechas ni contacto visible', 'Ante dos negocios, la IA prefiere el que puede <b>fechar y verificar</b>: teléfono, dirección, aviso legal y cuándo se actualizó.'),
  marco(7, `
    <div style="margin-top:110px" class="avatar"><img src="file://${DIR}/andres.webp"></div>
    <h2 style="margin-top:50px" class="deg">Compruébalo gratis en 30 segundos</h2>
    <p class="txt" style="margin-top:34px">Analizo tu web <b>como la lee la IA</b>: nota de 0 a 100 y lo que tienes que arreglar primero.</p>
    <div style="margin-top:56px"><span class="boton">andresrendon.com/auditoria-aeo</span></div>`, { flecha: false }),
];

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [i, html] of slides.entries()) {
  const f = `${DIR}/slide-${i + 1}.html`;
  writeFileSync(f, html);
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${DIR}/aeo-senales-${i + 1}.jpg`, type: 'jpeg', quality: 90 });
}
await b.close();
console.log('ok', slides.length);
