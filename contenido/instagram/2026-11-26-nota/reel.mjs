// Reel "¿Qué nota le pondría ChatGPT a tu web?" · 1080x1920 · 30 fps · 20 s.
// Dibuja cada fotograma con render(t) en el navegador y monta con ffmpeg.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

const C = '/home/claude/carrusel';
const OUT = process.argv[2] || '/home/claude/reel/nota';
const FR = `${OUT}/frames`;
rmSync(FR, { recursive: true, force: true }); mkdirSync(FR, { recursive: true });
const FPS = 30, DUR = 20;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Display;src:url(file://${C}/bricolage-grotesque.woff2);font-weight:200 800}
@font-face{font-family:Geist;src:url(file://${C}/Geist-Regular.woff2);font-weight:400}
@font-face{font-family:Geist;src:url(file://${C}/Geist-SemiBold.woff2);font-weight:600}
@font-face{font-family:Mono;src:url(file://${C}/GeistMono-Regular.woff2)}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1920px;overflow:hidden;color:#eef1f5;font-family:Geist,sans-serif;position:relative;background:#05060d}
.aurora{position:absolute;inset:-20%;background:radial-gradient(38% 28% at 20% 15%,rgba(63,91,255,.55),transparent 70%),radial-gradient(34% 26% at 85% 35%,rgba(139,92,246,.45),transparent 70%),radial-gradient(40% 30% at 50% 90%,rgba(34,211,238,.25),transparent 70%);filter:blur(50px)}
.red{position:absolute;inset:0;opacity:.35;background-image:radial-gradient(circle at 1.5px 1.5px,rgba(142,166,255,.4) 1.5px,transparent 0);background-size:36px 36px;-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 80%)}
.esc{position:absolute;inset:0;padding:170px 90px 320px;display:flex;flex-direction:column;justify-content:center;opacity:0}
.chip{align-self:flex-start;display:inline-flex;align-items:center;gap:12px;border:1.5px solid rgba(142,166,255,.4);background:rgba(63,91,255,.16);border-radius:999px;padding:12px 26px;font-weight:600;font-size:30px;color:#dce3ff}
.punto{width:14px;height:14px;border-radius:99px;background:#22d3ee;box-shadow:0 0 16px #22d3ee}
h1{font-family:Display;font-weight:800;letter-spacing:-.02em;line-height:.98;font-size:132px}
h2{font-family:Display;font-weight:800;letter-spacing:-.02em;line-height:1;font-size:88px}
.deg{background:linear-gradient(100deg,#fff 10%,#b9c7ff 45%,#a78bfa 72%,#67e8f9 98%);-webkit-background-clip:text;color:transparent}
.txt{font-size:48px;line-height:1.35;color:#c9d0de}.txt b{color:#fff}
.term{font-family:Mono;font-size:36px;color:#8ea6ff}
.lista{margin-top:50px;border:1.5px solid rgba(142,166,255,.28);background:rgba(255,255,255,.04);border-radius:32px;padding:16px 40px}
.it{display:flex;align-items:center;gap:24px;padding:20px 0;font-size:42px;color:#fff;opacity:0;border-bottom:1.5px solid rgba(142,166,255,.12)}
.it:last-child{border-bottom:0}
.ok{width:46px;height:46px;border-radius:99px;display:grid;place-items:center;font-size:28px;background:linear-gradient(120deg,#3f5bff,#22d3ee);flex:none}
.cifra{font-family:Display;font-weight:800;font-size:400px;line-height:.9}
.cifra small{font-size:110px;color:#8f9ab0;-webkit-text-fill-color:#8f9ab0}
.mala{background:linear-gradient(120deg,#ff6b6b,#f472b6 50%,#a78bfa);-webkit-background-clip:text;color:transparent}
.buena{background:linear-gradient(120deg,#3f5bff,#8b5cf6 55%,#22d3ee);-webkit-background-clip:text;color:transparent}
.barra{height:34px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:40px}
.barra i{display:block;height:100%;width:0;border-radius:99px}
.etq{align-self:flex-start;font-size:30px;color:#aab4c8;border:1.5px dashed rgba(170,180,200,.5);border-radius:999px;padding:10px 24px;margin-top:22px}
.palabra{display:inline-block;font-family:Display;font-weight:800;font-size:230px;padding:10px 60px 26px;border-radius:48px;border:3px solid rgba(142,166,255,.55);background:rgba(63,91,255,.18);box-shadow:0 0 120px rgba(99,102,241,.5)}
.boton{display:inline-block;border-radius:34px;padding:34px 52px;font-weight:600;font-size:42px;color:#fff;background:linear-gradient(110deg,#3f5bff,#7c3aed 55%,#0891b2);box-shadow:0 20px 70px -15px rgba(99,102,241,.8)}
.avatar{width:200px;height:200px;border-radius:999px;padding:7px;background:conic-gradient(from 30deg,#3f5bff,#8b5cf6,#22d3ee,#3f5bff);box-shadow:0 0 80px rgba(99,102,241,.6)}
.avatar img{width:100%;height:100%;border-radius:999px;object-fit:cover;object-position:top}
.marca{position:absolute;left:90px;bottom:120px;font-size:32px;color:#8f9ab0}
</style></head><body>
<div class="aurora" id="aur"></div><div class="red"></div>

<div class="esc" id="e1">
  <span class="chip"><span class="punto"></span>Andrés AI Studio</span>
  <div class="term" style="margin-top:70px"><span id="tipo"></span><span id="cur">▍</span></div>
  <h1 class="deg" style="margin-top:34px">¿Qué nota le pondría ChatGPT a tu web?</h1>
</div>

<div class="esc" id="e2">
  <h2>Mi auditor le hace <span class="deg">8 preguntas</span></h2>
  <p class="txt" style="margin-top:24px">las mismas que una IA antes de recomendarte</p>
  <div class="lista">
    ${['¿Puede entrar?', '¿Puede leerla sin JavaScript?', '¿Sabe qué vendes?', '¿Puede citarte?', '¿Se fía de ti?', '¿Está al día?', '¿Está indexada?', '¿Responde rápido?']
      .map(q => `<div class="it"><span class="ok">✓</span>${q}</div>`).join('')}
  </div>
</div>

<div class="esc" id="e3">
  <span class="chip"><span class="punto" style="background:#ff6b6b;box-shadow:0 0 16px #ff6b6b"></span>Web hecha solo con JavaScript</span>
  <span class="etq">Web de ejemplo</span>
  <div class="cifra mala" style="margin-top:60px"><span id="n3">0</span><small>/100</small></div>
  <div class="barra"><i id="b3" style="background:linear-gradient(90deg,#ff6b6b,#f472b6)"></i></div>
  <p class="txt" style="margin-top:50px">Una persona la ve perfecta. <b>La IA no puede leerla.</b></p>
</div>

<div class="esc" id="e4">
  <span class="chip"><span class="punto"></span>Avancés Campus</span>
  <span class="etq">Cliente real</span>
  <div class="cifra buena" style="margin-top:60px"><span id="n4">0</span><small>/100</small></div>
  <div class="barra"><i id="b4" style="background:linear-gradient(90deg,#3f5bff,#8b5cf6,#22d3ee)"></i></div>
  <p class="txt" style="margin-top:50px">La IA la lee entera, <b>y sabe qué vende y dónde.</b></p>
</div>

<div class="esc" id="e5">
  <div class="avatar"><img src="file://${C}/andres.webp"></div>
  <p class="txt" style="margin-top:56px;font-size:58px">¿Y la tuya? Comenta</p>
  <div style="margin-top:30px"><span class="palabra" id="pal"><span class="deg">NOTA</span></span></div>
  <p class="txt" style="margin-top:50px">y te digo <b>tu nota de 0 a 100</b> y qué arreglar primero. Gratis.</p>
  <div style="margin-top:56px"><span class="boton">andresrendon.com/auditoria-aeo</span></div>
</div>

<div class="marca">@andresrendon.ai</div>
<script>
const esc = [['e1',0,3],['e2',3,8],['e3',8,12],['e4',12,16],['e5',16,20]];
const cl = (x)=>Math.max(0,Math.min(1,x));
const ease = (x)=>1-Math.pow(1-cl(x),3);
const TXT = '› poniendo nota a tu web…';
window.render = (t) => {
  document.getElementById('aur').style.transform = 'translate('+(Math.sin(t*.4)*40)+'px,'+(Math.cos(t*.3)*30)+'px)';
  for (const [id,a,b] of esc) {
    const el = document.getElementById(id);
    const fin = (id==='e5') ? 1 : 1-cl((t-(b-.3))/.3);
    const op = Math.min(cl((t-a)/.35), fin);
    el.style.opacity = op;
    el.style.transform = 'translateY('+((1-ease((t-a)/.5))*40)+'px)';
  }
  document.getElementById('tipo').textContent = TXT.slice(0, Math.floor(cl(t/1.4)*TXT.length));
  document.getElementById('cur').style.opacity = (Math.floor(t*3)%2)?0:1;
  document.querySelectorAll('.it').forEach((it,i)=>{ const s=3.6+i*.45; it.style.opacity=cl((t-s)/.25); it.style.transform='translateX('+((1-ease((t-s)/.35))*-30)+'px)'; });
  const p3 = ease((t-8.4)/1.6), p4 = ease((t-12.4)/1.8);
  document.getElementById('n3').textContent = Math.round(25*p3);
  document.getElementById('b3').style.width = (25*p3)+'%';
  document.getElementById('n4').textContent = Math.round(95*p4);
  document.getElementById('b4').style.width = (95*p4)+'%';
  const s = 1 + Math.max(0, Math.sin((t-16.6)*3))*0.04*(t>16.6?1:0);
  document.getElementById('pal').style.transform = 'scale('+s+')';
};
</script></body></html>`;

writeFileSync(`${OUT}/reel.html`, html);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(`file://${OUT}/reel.html`);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
for (let f = 0; f < FPS * DUR; f++) {
  await p.evaluate((t) => window.render(t), f / FPS);
  await p.screenshot({ path: `${FR}/${String(f).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
// portada: fotograma del gancho ya escrito
await p.evaluate(() => window.render(2.2));
await p.screenshot({ path: `${OUT}/portada.jpg`, type: 'jpeg', quality: 90 });
await b.close();
// Instagram pide pista de audio: silencio hasta que se añada la voz.
execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${FR}/%04d.jpg -f lavfi -i anullsrc=r=44100:cl=stereo -shortest -c:v libx264 -pix_fmt yuv420p -profile:v high -crf 20 -movflags +faststart -c:a aac -b:a 128k ${OUT}/reel-nota.mp4`);
console.log('ok');
