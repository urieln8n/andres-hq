# Cuartel general de Andrés: instrucciones para Claude

Este repo es el **mapa de todos los proyectos de Andrés**. No contiene el código de los
proyectos: cada uno vive en su propio repo. Aquí está el índice, el estado y el siguiente paso.

## Archivos

| Archivo | Para qué |
|---|---|
| `proyectos.json` | **Fuente única de verdad.** Un objeto por proyecto. |
| `PROYECTOS.md` / `mapa.html` | Se generan con `node scripts/generar.mjs`. No editar a mano. |
| `IDEAS.md` | Aparcadero de ideas nuevas. Una idea NO es un proyecto. |
| `BITACORA.md` | Una línea por sesión de trabajo: fecha · proyecto · qué se hizo. |
| `plantilla-proyecto/` | README + CLAUDE.md para copiar en cada repo nuevo. |

## Reglas (aplícalas siempre)

1. **Antes de crear algo nuevo, busca en `proyectos.json`.** Si ya existe algo parecido
   (otra web de barbería, otro auditor, otro SaaS de vídeo…), propón continuar ese en vez
   de empezar de cero. Díselo a Andrés con el nombre del repo.
2. **Una idea nueva va a `IDEAS.md`**, con fecha y una línea. Solo pasa a proyecto cuando
   Andrés lo decide y hay un primer paso concreto.
3. **Máximo 3 proyectos en estado `foco`.** Si Andrés quiere meter otro, pregúntale cuál pasa
   a `aparcado`.
4. **Todo proyecto tiene repo en GitHub** desde el primer día (privado si lleva datos o
   claves). Nada vive solo en el PC: lo que está "solo en el PC" se marca con ⚠️.
5. **Al acabar una sesión** en cualquier proyecto:
   - actualiza su `siguiente` (y `estado` si cambia) en `proyectos.json`,
   - pon la fecha de hoy en `actualizado`,
   - añade una línea a `BITACORA.md`,
   - ejecuta `node scripts/generar.mjs` y haz commit + push.
6. **Proyecto nuevo:** copia `plantilla-proyecto/README.md` y `plantilla-proyecto/CLAUDE.md`
   al repo nuevo, rellénalos y añade la entrada en `proyectos.json`.

## Campos de cada proyecto

`id`, `nombre`, `estado` (foco · clientes · base · aparcado · muerto), `tipo`, `que_es`,
`repo`, `url`, `publicar` (cómo se publica), `donde_esta`, `siguiente` (un solo paso, concreto).

## Cuando Andrés pregunte "¿en qué estaba?" o "¿qué hago hoy?"

Lee `proyectos.json` y las últimas líneas de `BITACORA.md` y responde con los proyectos en
`foco` y su `siguiente`. Nada más.
