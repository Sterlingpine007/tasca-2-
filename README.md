# Tasca 2: Dataset de Padró de Barcelona 2023

Aquesta aplicació web en HTML, CSS i JavaScript descarrega dades del dataset següent amb `fetch(url)` i les mostra de manera tabulada:

- https://opendata-ajuntament.barcelona.cat/resources/bcn/EstadisticaPadro/pad/2023/2023_pad_m_cognom.json

## Fitxers

- `index.html` — estructura de la pàgina i la taula.
- `styles.css` — estils per a una taula responsive i clarament llegible.
- `script.js` — codi que descarrega les dades amb `fetch`, gestiona errors i les rendeix en una taula HTML.

## Instrucciones

1. Abre `index.html` en el navegador.
2. La aplicación intenta cargar primero el archivo local `json` y muestra las primeras 100 filas.
3. Si no hay acceso local, intenta el dataset remoto y, si es necesario, usa un proxy CORS.

> Nota: Para evitar problemas de carga con `file://`, abre el proyecto con un servidor local si es posible.

## Comentaris

El codi inclou comentaris amb les fonts de consulta utilitzades per implementar l'API Fetch i el render de taules.
