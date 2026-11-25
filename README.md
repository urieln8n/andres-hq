# andres-hq · Cuartel general

El mapa de **todos** mis proyectos: qué es cada uno, dónde está el código, cómo se publica y
cuál es el siguiente paso. Así no se pierde nada aunque pasen semanas.

👉 **[Ver el mapa (PROYECTOS.md)](PROYECTOS.md)**. También puedes abrir `mapa.html` en el navegador: es un tablero por columnas que se ve bien en el móvil.

## Las 3 reglas

1. **Idea nueva → `IDEAS.md`.** No abro repo hasta que decida hacerla.
2. **Máximo 3 proyectos en foco.** Para meter uno, saco otro.
3. **Al terminar cada sesión**, le digo a Claude: *"actualiza el cuartel general"*.

## Cómo lo uso con Claude Code

Clona este repo en `~/proyectos/andres-hq` y, en cualquier sesión, dile a Claude:

- *"¿Qué tengo en foco?"* → lee el mapa y te dice los 3 proyectos y su siguiente paso.
- *"Tengo una idea: …"* → la apunta en `IDEAS.md` y te avisa si ya tienes algo parecido.
- *"Actualiza el cuartel general: en X he hecho Y"* → actualiza `proyectos.json`, la
  bitácora, regenera el mapa y hace push.
- *"Empiezo proyecto nuevo: …"* → crea el repo con la plantilla y lo da de alta.

Las instrucciones completas para Claude están en [`CLAUDE.md`](CLAUDE.md).

## Regenerar el mapa

```bash
node scripts/generar.mjs
```

## Carpetas recomendadas en el PC (WSL)

```
~/proyectos/
  andres-hq/          ← este repo
  aeo-auditor/
  kit-andresrendon/
  chispa/
  …                   ← un repo por carpeta, con el mismo nombre que en GitHub
```
