// Dibuja los fondos y tarjetas del reel (1080x1920) con la estética de @andresrendon.ai
import { chromium } from '/home/claude/aeo-auditor/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const C = '/home/claude/carrusel';
const D = '/home/claude/reel';
const css = `
@font-face{font-family:Display;src:url(file://${C}/bricolage-grotesque.woff2);font-weight:200 800}
@font-face{font-family:Geist;src:url(file://${C}/Geist-Regular.woff2);font-weight:400}
@font-face{font-family:Geist;src:url(file://${C}/Geist-SemiBold.woff2);font-weight:600}
@font-face{font-family:Mono;src:url(file://${C}/GeistMono-Regular.woff2)}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1920px;overflow:hidden;color:#eef1f5;font-family:Geist,sans-serif;position:relative;background:#05060d}
.aurora{position:absolute;inset:-20%;background:radial-gradient(38% 28% at 20% 15%,rgba(63,91,255,.55),transparent 70%),radial-gradient(34% 26% at 85% 35%,rgba(139,92,246,.45),transparent 70%),radial-gradient(40% 30% at 50% 90%,rgba(34,211,238,.25),transparent 70%);filter:blur(50px)}
.red{position:absolute;inset:0;opacity:.35;background-image:radial-gradient(circle at 1.5px 1.5px,rgba(142,166,255,.4) 1.5px,transparent 0);background-size:36px 36px;-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 80%)}
.pad{position:absolute;inset:0;padding:150px 90px;display:flex;flex-direction:column}
.chip{align-self:flex-start;display:inline-flex;align-items:center;gap:12px;border:1.5px solid rgba(142,166,255,.4);background:rgba(63,91,255,.16);border-radius:999px;padding:12px 26px;font-weight:600;font-size:30px;color:#dce3ff}
.punto{width:14px;height:14px;border-radius:99px;background:#22d3ee;box-shadow:0 0 16px #22d3ee}
h1{font-family:Display;font-weight:800;letter-spacing:-.02em;line-height:.98;font-size:136px}
h2{font-family:Display;font-weight:800;letter-spacing:-.02em;line-height:1;font-size:72px}
.deg{background:linear-gradient(100deg,#fff 10%,#b9c7ff 45%,#a78bfa 72%,#67e8f9 98%);-webkit-background-clip:text;color:transparent}
.txt{font-size:48px;line-height:1.35;color:#c9d0de}
.txt b{color:#fff}
.term{font-family:Mono;font-size:34px;color:#8ea6ff}
.cero{font-family:Display;font-weight:800;font-size:420px;line-height:.9;background:linear-gradient(120deg,#ff6b6b,#f472b6 50%,#a78bfa);-webkit-background-clip:text;color:transparent}
.boton{display:inline-block;border-radius:34px;padding:38px 56px;font-weight:600;font-size:46px;color:#fff;background:linear-gradient(110deg,#3f5bff,#7c3aed 55%,#0891b2);box-shadow:0 20px 70px -15px rgba(99,102,241,.8)}
.avatar{width:230px;height:230px;border-radius:999px;padding:7px;background:conic-gradient(from 30deg,#3f5bff,#8b5cf6,#22d3ee,#3f5bff);box-shadow:0 0 80px rgba(99,102,241,.6)}
.avatar img{width:100%;height:100%;border-radius:999px;object-fit:cover;object-position:top}
.pie{margin-top:auto;font-size:32px;color:#8f9ab0}
`;
const pagina = (cuerpo, fondo = true) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body style="${fondo ? '' : 'background:transparent'}">${fondo ? '<div class="aurora"></div><div class="red"></div>' : ''}${cuerpo}</body></html>`;

const escenas = {
  gancho: pagina(`<div class="pad" style="justify-content:center;padding-bottom:300px">
    <span class="chip"><span class="punto"></span>Andrés AI Studio</span>
    <div class="term" style="margin-top:70px">› analizando tu web con IA…</div>
    <h1 class="deg" style="margin-top:30px">¿Te puede recomendar ChatGPT?</h1>
    <p class="txt" style="margin-top:50px">Mira lo que ve la IA de una web 👇</p></div>`),
  fondo: pagina(`<div class="pad" style="padding-top:110px">
    <div style="display:flex;align-items:center;gap:22px;margin-top:-40px"><span class="chip"><span class="punto"></span>Así la ve la IA</span>
    <span style="font-size:28px;color:#aab4c8;border:1.5px dashed rgba(170,180,200,.5);border-radius:999px;padding:10px 22px">Ejemplo: web hecha solo con JavaScript</span></div></div>`),
  golpe: pagina(`<div class="pad" style="justify-content:center;align-items:flex-start;padding-bottom:260px">
    <span class="chip"><span class="punto"></span>Resultado</span>
    <div class="cero" style="margin-top:40px">0</div>
    <h2 class="deg" style="margin-top:10px;font-size:96px">palabras lee la IA de esta web</h2>
    <p class="txt" style="margin-top:46px">Una persona la ve perfecta. <b>ChatGPT la ve vacía</b>, así que no la puede recomendar.</p></div>`),
  cierre: pagina(`<div class="pad" style="justify-content:center;padding-bottom:260px">
    <div class="avatar"><img src="file://${C}/andres.webp"></div>
    <h1 class="deg" style="margin-top:60px;font-size:118px">¿Y la tuya?</h1>
    <p class="txt" style="margin-top:40px">Analizo tu web <b>gratis en 30 segundos</b>: nota de 0 a 100 y qué arreglar primero.</p>
    <div style="margin-top:60px"><span class="boton">Link en la bio ↗</span></div>
    <p class="pie">@andresrendon.ai · andresrendon.com/auditoria-aeo</p></div>`),
  // Marco del móvil: transparente salvo el borde (se pone encima de la grabación)
  marco: pagina(`<div style="position:absolute;left:171px;top:250px;width:738px;height:1593px;border-radius:84px;border:14px solid #1c2033;box-shadow:0 0 0 2px rgba(142,166,255,.35),0 60px 140px -30px rgba(63,91,255,.6)"></div>
    <div style="position:absolute;left:470px;top:278px;width:140px;height:34px;border-radius:30px;background:#05060d"></div>`, false),
};

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nombre, html] of Object.entries(escenas)) {
  const f = `${D}/${nombre}.html`;
  writeFileSync(f, html);
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${D}/${nombre}.png`, omitBackground: nombre === 'marco' });
}
await b.close();
console.log('ok');
