🎯 Generador y Calculador de Rutas de Laberintos
Este proyecto es una aplicación web interactiva que utiliza algoritmos de búsqueda para generar y resolver laberintos. El sistema permite la manipulación de obstáculos en tiempo real, ofreciendo una visualización directa a través de la consola del navegador.

🚀 Características
Generación Aleatoria: Crea laberintos únicos utilizando el algoritmo DFS (Depth-First Search).

Caminos Múltiples: El generador garantiza que no haya una única solución, creando rutas alternativas.

Buscador de Rutas Inteligente: Implementa el algoritmo BFS (Breadth-First Search) para encontrar la ruta más corta.

Sistema de Prioridades y Obstáculos: * 🌊 Agua: El algoritmo intentará evitarla a menos que sea estrictamente necesario (Baja prioridad).

🚧 Muros: Bloquean el paso completamente.

Visualización en Consola: El laberinto se renderiza con caracteres ASCII y colores ANSI en la consola del desarrollador.

🛠️ Cómo Ejecutar el Proyecto
Dado que el proyecto utiliza JavaScript puro y HTML, no requiere servidores complejos:

Descarga o clona este repositorio.

Abre el archivo index.html en tu navegador favorito (Chrome, Edge o Firefox recomendados).

Importante: Presiona F12 o clic derecho -> Inspeccionar y ve a la pestaña Consola para ver el laberinto.

🎮 Guía de Uso de la Interfaz
La interfaz está dividida en tres secciones lógicas que deben seguirse en orden para un funcionamiento óptimo:

1. Crear el Laberinto
Filas y Columnas: Ingresa el tamaño deseado.

Nota: Para que el algoritmo de generación funcione correctamente, los números deben ser impares (ej. 21, 21).

Haz clic en "Generar Laberinto". Verás el mapa inicial de paredes (███) y espacios vacíos en la consola.

2. Establecer Metas y Resolver
Inicio (X, Y): Define la coordenada de partida (por defecto suele ser 1, 1).

Fin (X, Y): Define la coordenada de destino.

Haz clic en "Encontrar Ruta". El camino óptimo se marcará en la consola con bloques de color rojo.

3. Agregar Obstáculos Dinámicos
Puedes alterar el laberinto en cualquier momento:

Ingresa la Posición X e Y donde deseas colocar un obstáculo.

Selecciona el tipo:

Agua (🌊): El camino "pesará" más, pero es cruzable.

Muro (🚧): El camino se cerrará ahí.

Haz clic en "Colocar Obstáculo".

⚠️ Nota Importante: Si colocas un obstáculo después de haber resuelto el laberinto, el rastro anterior se limpiará automáticamente. Deberás presionar nuevamente el botón "Encontrar Ruta" para ver cómo el algoritmo se adapta a los nuevos cambios.

🧠 Explicación Técnica
El núcleo del proyecto reside en dos algoritmos fundamentales:

Generador DFS: Utiliza recursividad y movimientos aleatorios para "tallar" caminos en una cuadrícula llena de paredes. Multiplica los pasos por 2 para mantener la estructura de pasillos y paredes.

Resolutor BFS con Pesos: * Utiliza una Cola (Queue) para explorar los nodos.

Priorización: Cuando el algoritmo encuentra un espacio vacío (" "), lo coloca al inicio de la cola (unshift) para explorarlo de inmediato. Si encuentra agua ("🌊"), lo coloca al final (push), simulando un costo de movimiento mayor.

Reconstrucción: Al llegar a la meta, utiliza una matriz de "padres" para volver desde el final hasta el inicio marcando el camino recorrido.

📋 Requisitos
Navegador web moderno.

La consola debe tener un ancho suficiente para visualizar laberintos grandes.
