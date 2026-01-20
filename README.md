# 🎯 Generador y Calculador de Rutas de Laberintos

Este es un proyecto interactivo desarrollado en **JavaScript puro (Vanilla JS)** y **HTML5**. Utiliza algoritmos de búsqueda en grafos para generar laberintos aleatorios y encontrar la ruta más corta entre dos puntos, permitiendo la manipulación dinámica de obstáculos con diferentes prioridades.

> **Nota importante:** Los resultados, el renderizado del mapa y la resolución se visualizan directamente en la **Consola del Navegador**.

---

## 🚀 Características Principales

* **Generación Procedural:** Utiliza el algoritmo **DFS (Depth-First Search)** para crear laberintos perfectos.
* **Caminos Múltiples:** El sistema rompe paredes aleatoriamente para garantizar que existan varias rutas posibles.
* **Algoritmo de Ruta Óptima:** Implementa **BFS (Breadth-First Search)** para encontrar el camino más corto.
* **Obstáculos con Lógica de Peso:**
    * 🌊 **Agua:** El algoritmo le da baja prioridad (trata de evitarla a menos que sea el único camino).
    * 🚧 **Muro:** Bloquea totalmente el paso.
* **Interfaz Intuitiva:** Control total mediante formularios y botones.

---

## 🎮 Guía de Uso e Interacción

Para utilizar la aplicación correctamente, sigue estos pasos en orden:

### 1. Configuración del Tablero
* Ingresa el número de **Filas** y **Columnas**.
* **Regla de Oro:** Los valores deben ser **números impares** (ejemplo: 21x21, 25x15) para que el generador de caminos funcione correctamente. Pueden ser tableros cuadrados o rectangulares.
* Haz clic en **"Generar Laberinto"**. El laberinto aparecerá en la consola.

### 2. Definición de Metas y Resolución
* Ingresa las coordenadas de **Inicio (X, Y)** y **Fin (X, Y)**.
* Haz clic en **"Encontrar Ruta"**. 
* El sistema pintará en la consola el recorrido en **color rojo** (`███`).

### 3. Dinámica de Obstáculos
Puedes personalizar el desafío agregando obstáculos en cualquier momento:
1.  Ingresa la posición (X, Y) y selecciona el tipo (Agua o Muro).
2.  Haz clic en **"Colocar Obstáculo"**.
3.  **Importante:** Si el laberinto ya estaba resuelto y colocas un nuevo obstáculo, deberás presionar nuevamente el botón **"Encontrar Ruta"** para recalcular el camino evitando o priorizando según el nuevo escenario.



---

## 🛠️ Instrucciones para Ejecución

1.  Clona este repositorio o descarga los archivos.
2.  Abre el archivo `index.html` en tu navegador.
3.  Abre las **Herramientas de Desarrollador** (`F12` o `Ctrl + Shift + I`).
4.  Selecciona la pestaña **Console (Consola)**.
5.  ¡Interactúa con la interfaz de la página y observa los cambios en la consola!

---

## 🧠 Detalles Técnicos del Código

### Generación (DFS)
El código utiliza recursividad para explorar la matriz de 1s (paredes) y convertirlos en 0s (caminos). Al multiplicar el paso por 2, se asegura de dejar muros divisorios consistentes.

### Resolución (BFS con Prioridad)
Aunque BFS normalmente no maneja pesos, este proyecto implementa una lógica ingeniosa:
* Si encuentra un **espacio vacío**, se añade al inicio de la cola (`unshift`), dándole prioridad inmediata.
* Si encuentra **agua**, se añade al final de la cola (`push`), haciendo que el algoritmo explore primero todas las demás opciones antes de decidir cruzar el agua.
* Si encuentra un **muro**, el nodo se ignora (`continue`).

---

## 🎨 Estilos y UI
La interfaz cuenta con un diseño moderno usando:
* Degradados CSS lineales.
* Efectos de desenfoque (Glassmorphism).
* Diseño responsivo para móviles y escritorio.
