# Reel · "Así ve ChatGPT una web hecha solo con JavaScript"

- Versión con voz de Andrés + subtítulos publicada 2026-11-25 (media id 18497100334105891), vídeo reel-con-voz.mp4
- Versión sin voz (media id 18084690914354871): borrada por Andrés desde la app el 2026-11-25
- Vídeo y portada: andres-web/public/ig/2026-11-25-reel-auditor/
- grabar.mjs: graba el auditor (Worker en local con `wrangler dev`) sobre la web de ejemplo sin SSR, mostrada como "tuweb-ejemplo.com" y etiquetada como ejemplo
- escenas.mjs: gancho, fondo con marco de móvil, golpe ("0 palabras") y cierre
- Montaje: ffmpeg (una escena por archivo, concat con -c copy, audio silencioso)
