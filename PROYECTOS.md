# Mapa de proyectos de Andrés

Actualizado: **2026-11-25** · 24 proyectos · 3/3 en foco

> Este archivo se genera solo desde `proyectos.json`. No lo edites a mano: edita el JSON y ejecuta `node scripts/generar.mjs`.

## 🔥 En foco (esta semana trabajo aquí)

| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |
|---|---|---|---|---|
| **[kit.andresrendon.com](https://kit.andresrendon.com)** | Web del kit de ganchos gratis + oferta de web 3D + auditoría de canal 19,90 € | [urieln8n/kit-andresrendon](https://github.com/urieln8n/kit-andresrendon) | GitHub<br>Automático: cada push a main se publica (Cloudflare Pages) | Enlace de pago Stripe para la auditoría de 19,90 € (meta: 10 vendidas) |
| **[Vice City Radar / canal GTA 6 (VICECLIP STUDIO)](https://www.youtube.com/@VICECLIPSTUDIO)** | Sistema local que genera Shorts de GTA 6 (noticias → guion → voz → montaje) | — | Solo en el PC: ~/vice-city-diario (WSL) ⚠️ sin copia en GitHub<br>Local en el PC (FastAPI 127.0.0.1:4686 + ComfyUI) | Subir ~/vice-city-diario a un repo privado; 5–7 Shorts/semana |
| **[Vintage Flow](https://www.youtube.com/@vintageflow-n1w)** | Canal de soul de los 50; meta 4.000 horas para monetizar | — | YouTube + carpeta de música en el PC<br>YouTube Studio | 2 recopilaciones de 1 h por semana con música original (ACE-Step) |

## 💼 Clientes y demos

| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |
|---|---|---|---|---|
| **[Avancés Campus (Edi)](https://avancescampus.es)** | Web 3D + presupuesto online + tablero del taller para avancés de caravana | [urieln8n/avancescampusedi](https://github.com/urieln8n/avancescampusedi) (actual) · [urieln8n/avancescampus](https://github.com/urieln8n/avancescampus) (versión anterior) | GitHub ⚠️ dos repos para lo mismo<br>Cloudflare Workers (wrangler) | Confirmar cuál es el bueno y archivar el otro; auditoría AEO |
| **StyleBuddhas (barbería, Gràcia)** | Web premium 3D con poste de barbero, reserva en Booksy y WhatsApp | [urieln8n/stylebudas](https://github.com/urieln8n/stylebudas) | GitHub<br>Cloudflare Workers (wrangler) | Faltan datos legales, horario y dominio; enseñársela al dueño |
| **La Casa de Jenni** | Web 3D: pollo payés y tartas por encargo, pedido por WhatsApp | [urieln8n/casadejenni](https://github.com/urieln8n/casadejenni) | GitHub<br>Cloudflare Workers (wrangler) | Enseñar la demo y cerrar |
| **JAVA hornos para pizza (Javier)** | Web premium 3D del horno JAVA; presupuesto por WhatsApp (demo noindex) | [urieln8n/javier3d](https://github.com/urieln8n/javier3d) | GitHub<br>Carpeta web-premium/ estática | Enseñar la demo y cerrar |

## 🧱 Mi base (webs y herramientas que uso para vender)

| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |
|---|---|---|---|---|
| **Auditor AEO (Andrés AI Studio)** | Mide si ChatGPT/Perplexity/Claude/Gemini pueden leer y citar una web; informe HTML con tu marca | [urieln8n/aeo-auditor](https://github.com/urieln8n/aeo-auditor) | GitHub<br>Herramienta local: npm run auditar -- https://web.com --cliente nombre | Jueves 26: instalarlo en el PC y auditar Avancés Campus. Plan de venta: https://claude.ai/artifact/2U8rEBqHajPAqQD9FvtvNK |
| **Kits de Juanpe (Cazador de webs + Auditoría de negocio)** | Kit 01 rehace webs en 3D con propuesta; Kit 03 audita negocio por fuera y por dentro | — | Proyecto de Claude 'kit ganar dinero' (zips) ⚠️ descomprimir en ~/proyectos/kits<br>Abrir la carpeta en VS Code + Claude Code → /setup | Usar dentro de la oferta de 4 escalones (ver plan de venta del auditor AEO) |
| **[andresrendon.com](https://andresrendon.com)** | Web personal premium para vender sistemas con IA; portafolio de proyectos | [urieln8n/andres-web](https://github.com/urieln8n/andres-web) | GitHub<br>Next.js | Añadir servicio 'Auditoría IA' y enlazar al auditor AEO |
| **Web Rescue OS / Web Rescue Security** | Auditoría defensiva, recuperación y AEO; dashboard (privado) + web pública | [urieln8n/web-rescue-os](https://github.com/urieln8n/web-rescue-os) (privado) · [urieln8n/webrescure](https://github.com/urieln8n/webrescure) (web) | GitHub<br>Web estática en Cloudflare Pages | Decidir si se fusiona con el auditor AEO (hacen cosas parecidas) |
| **[Túnel 3D (tunel.andresrendon.com)](https://tunel.andresrendon.com)** | Web de una página con túnel 3D por scroll | [urieln8n/tunel-andresrendon](https://github.com/urieln8n/tunel-andresrendon) | GitHub<br>npx wrangler deploy | Usar como demo de portafolio |

## 🧊 Aparcado (vale la pena, pero no ahora)

| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |
|---|---|---|---|---|
| **[Lumbrera (aprender Génesis) + Pulsazo](https://genesis.andresrendon.com)** | Trivial de Génesis (150 preguntas, 15 lecciones, modo grupo). Mismo repo que Pulsazo (quiz en vivo) | [urieln8n/chispa](https://github.com/urieln8n/chispa) | GitHub<br>Manual: git pull + npx wrangler deploy --env fe | Publicar commit 6fff165 pendiente; 1 mejora por semana (mantenimiento) |
| **AI Market** | 'CoinMarketCap de la IA': registra cambios en GitHub, Hugging Face, etc. | [urieln8n/AI-MARKET](https://github.com/urieln8n/AI-MARKET) (privado) | GitHub + USB + Docker local; datos hasta 26 oct 2026<br>Local (Docker + PostgreSQL) | Usar los datos como contenido de IA; retomar recolección cuando acabe el sprint |
| **[ALACHÁN HOME (tienda Shopify)](https://tienda.andresrendon.com)** | Dropshipping de hogar premium para España con Dropi PRO | — | Shopify<br>Panel de Shopify | Elegir productos definitivos |
| **ViceClipStudio Growth (SaaS)** | SaaS para creadores: auditorías de canal, ideas, guiones, Auto Shorts | [urieln8n/viceclipstudio](https://github.com/urieln8n/viceclipstudio) (⚠️ vacío / sin subir) | PC (WSL) | Solo si se venden 10 auditorías de 19,90 € (fase 0) |
| **Andres Video Studio** | Recorte de silencios, muletillas, subtítulos y empaquetado para redes (local) | [urieln8n/andres-video-studio](https://github.com/urieln8n/andres-video-studio) | GitHub<br>Local | Puede servir dentro de Vice City Radar |
| **Finanzas con Paz** | App familiar de finanzas con fe; meta SaaS 9,99 €/mes | [urieln8n/finanzas-familiares](https://github.com/urieln8n/finanzas-familiares) | GitHub<br>Vercel + Supabase | — |
| **FeedAPet (con Annie)** | Comunidad/marketplace 'Compra, ahorra, ayuda' | [urieln8n/feedApeet](https://github.com/urieln8n/feedApeet) | GitHub<br>Next.js + Supabase + Vercel | Hablar con Annie si sigue |
| **Andres Project for Pizzerías** | Landing + dashboard mock de SaaS para pizzerías | [urieln8n/andres-project](https://github.com/urieln8n/andres-project) | GitHub<br>Next.js | Se solapa con los kits de webs para negocios locales |
| **PresupuestoPro IA** | App Next.js de presupuestos con IA | [urieln8n/presupuestopro-ia](https://github.com/urieln8n/presupuestopro-ia) | GitHub<br>Next.js | — |
| **VIAO** | Ecosistema de partners a dos lados (docs muy avanzadas) | [urieln8n/viao](https://github.com/urieln8n/viao) | GitHub<br>Next.js | — |

## 💀 Cerrado (no se toca; se guarda por si acaso)

| Proyecto | Qué es | Repo | Dónde está / cómo publicar | Siguiente paso |
|---|---|---|---|---|
| **[BarberíaOS](https://barberiaos.com)** | SaaS de agenda para barberías | [urieln8n/barberia-saas](https://github.com/urieln8n/barberia-saas) | GitHub + Supabase (proyecto aún activo)<br>Next.js + Supabase | Pausar el proyecto de Supabase si no se usa |
| **NeuralFlow (3 repos)** | Intentos antiguos (mar 2026); dos repos vacíos | [urieln8n/neuralflowapp](https://github.com/urieln8n/neuralflowapp) · neuralflow · neuralflow-ia | GitHub | Archivar en GitHub (Settings → Archive) |
