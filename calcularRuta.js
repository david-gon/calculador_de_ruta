//generamos el laberinto
function generadorDfs(x,y,fila,columna,matriz){
    let movimientos=[[1,0],[-1,0],[0,1],[0,-1]];//movimientos permitidos
    matriz[x][y]=0;//generamos un espacio colocando un cero que indique un espacio
    //mesclamos los movimientos para una mejor aleatoriedad
    for(let i=3; i>0;i--){
        let j=(Math.floor(Math.random()* 101))%(i+1);//generamos un numero al azar para la ubicacion de la fila
        //intercambio los movimientos de las posiciones 
        let rx=movimientos[i][0], ry=movimientos[i][1];
        movimientos[i][0]=movimientos[j][0];
        movimientos[i][1]=movimientos[j][1];
        movimientos[j][0]=rx;
        movimientos[j][1]=ry;
    }
    //verifico que el movimiento sea valido
    for(let i=0; i<movimientos.length; i++){
        let [dx,dy]=movimientos[i];
        //multiplico la nueva posible posicion por 2 para poder generar un camino
        let nx=x+dx*2, ny=y+dy*2;
        //verifico si está dentro del rango
        if(nx>0 && nx<fila && ny>0 && ny<columna && matriz[nx][ny]==1){
            matriz[dx+x][dy+y]=0//genero un espacio
            generadorDfs(nx,ny,fila,columna,matriz);//llamo a la recursion
        }
    }
}
//genero una matriz llena de unos
function generarCoordenada(fila, columna, matriz){
    for (let i=0; i<fila; i++){//recorro por la cantidad de filas 
        matriz[i]=[];//a cada fila lo convierto en una lista
        for (let j=0; j<columna; j++){
            matriz[i][j]=1;//coloco uno en todas las posiciones
        }
    }
    //una vez completada la matriz llena de unos llamo a generadorDfs para poder generar el laberinto
    generadorDfs(1,1,fila,columna,matriz);
}
//generamos paredes y espacio
function diseñarLaberinto(fila, columna, matriz){
    for(let i=0; i<fila; i++){
        for(let j=0; j<columna;j++){
            if(matriz[i][j]==1){//si es 1 colocamos pared 
                matriz[i][j]="███";
            }else{ //sino colocamos espacio
                matriz[i][j]="   ";
            }
        }
    }
}
//generamos mas de un camino posible
function masDeUnCamino(fila, columna,matriz){
    contador=0 //contador para terminar con el bucle while
    //generamos un espacio entre el punto de inicio para garantizar mas de un camino
    matriz[1][2]="   ";
    matriz[2][1]="   ";
    // generamos un bucle while para generar 5 espacios al azar
    while(contador<5){
        //generamos un numero al azar en base al tamaño de filas y columnas
        rx=Math.floor(Math.random() * fila);
        ry=Math.floor(Math.random() * columna);
        //verficamos que esté dentro del rango y que sea una pared
        if(rx>0 && rx<fila-1 && ry>0 && ry<columna-1 && matriz[rx][ry]=="███"){
            //generamos una pared y aumentamos el contador para terminar el ciclo
            matriz[rx][ry]="   ";
            contador++;
        }
    } 
    //imprimimos el camino
    for (let i=0; i<fila; i++){
             j=matriz[i].join("");
             console.log(j);
    }
}
//se generan los obstaculos
function generarObstaculos(){
    rx=Number(document.getElementById("obstaculox").value);//posicion del obstaculo en x
    ry=Number(document.getElementById("obstaculoy").value);//posicion del obstaculo en y
    obs=document.getElementById("opciones").value;// obstaculo a colocar
    //verificar que el obstaculo este dentro del rango
    if(rx>0 && rx<fila-1 && ry>0 && ry<columna-1){
        //colocamos el obstaculo dependiendo de la eleccion
        if(obs==="🌊"){
            matriz[rx][ry]="🌊";
        }else if(obs==="🚧"){
            matriz[rx][ry]="🚧";
        }else{
            alert("ingrese un valor")
        }
    }else{
        alert("ingrese una coordenada valida");
    }
    //imprimimos el laberinto
    for (let i=0; i<fila; i++){
             j=matriz[i].join("");
             console.log(j);
    }
}
//busqueda por bfs
//entrada=x,y | salida=fx,fy | visitados=matriz para saber si ya se visito el elemento
//padre=matriz para guardar registor de quien fue el padre de quien en el arbol
//matriz= laberinto que se utiliza 
function bfs(x,y,fx,fy,visitados,padre,matriz){
    let cola=[]//utilizamos una cola para guardar los nodos a analizar
    cola.push([x,y]);//guardamos el nodo en la cola
    visitados[x][y]=true;//generamos una matriz para marcar los visitados
    let movimientos=[[1,0],[-1,0],[0,1],[0,-1]];//movimientos disponibles
    let actual=[];//nos permite saber el nodo actual de la cola
    while (!(cola.length===0)){//mientras que la cola no esté vacia seguirá explorando el arbol
        actual=cola[0];//guardamos el primer elemento de la cola para poder estudiarlo
        cola.shift();//eliminamos el primer elemento de la cola que ya fue estudiado
        if (actual[0]===fx && actual[1]===fy){//si la posicion actual es igual a la meta terminamos el recorrido
            return;
        }
        for(let [dx,dy] of movimientos){//ejecutamos cada movimiento para recorrer el arbol
            let nx=actual[0]+dx, ny=actual[1]+dy;//buscamos posibles nodos
            
            if(nx>0 && nx<fila-1 && ny>0 && ny<columna-1 && !visitados[nx][ny] ){//verificamos que los nodos sean caminos 
                if (matriz[nx][ny] === "🚧") {//si es un obstaculo continuar sin hacer nada y sin guardarlo
                    continue; 
                }
                if(matriz[nx][ny]==="   "){//si es un espacio en blanco le damos prioridad guardandolo al frente
                    visitados[nx][ny]=true;
                    padre[nx][ny]=actual;
                    cola.unshift([nx,ny]);//lo coloca como primer elemento
                }else if(matriz[nx][ny]==="🌊"){//en caso de que sea agua colocamos al final de la lista para que no tenga prioridad en ser estudiado
                    visitados[nx][ny]=true;
                    padre[nx][ny]=actual;
                    cola.push([nx,ny]);//lo coloca como ultimo elemento
                }
            }
        }
    }    
}
//marca el recorrido en el laberinto
function recorrido(x,y,fx,fy,padre,matriz){
    matriz[x][y]="\x1b[31m███\x1b[0m";//marcamos recorrido en la entrada
    let actual=[fx,fy];//actual es igual al final ya que empezmos desde el final hasta la meta
    while(!(actual[0]===x && actual[1]===y)){
        matriz[actual[0]][actual[1]]="\x1b[31m███\x1b[0m";//dejamos un rastro
        actual=padre[actual[0]][actual[1]];//verficamos quien fue el padre
    }   
    //imprimimos el resultado
    for(let i=0;i<fila;i++){
        let j=matriz[i].join('');
        console.log(j);
    }
}
//limpiamos el recorrido en caso de agregar nuevos obstaculos o cambiear la meta
function limpiarrecorrido(matriz){
    for(let i=0; i<fila; i++){
        for (let j=0; j<columna; j++){
            if(typeof matriz[i][j]=="string" && matriz[i][j].includes("\x1b[31m")){
                matriz[i][j]="   ";
            }
        }
    }
}
// variables globales
let matriz=[];
let fila,columna;
let x,y,fx,fy
//es un main para todo lo que ttenga que ver con generar
function maingenerar(){
    console.clear();
    fila=Number(document.getElementById("fila").value);
    columna=Number(document.getElementById("columna").value);
    if (fila==="" || columna===""){
        alert("ingrese los campos requeridos");
        return;
    }else{
        generarCoordenada(fila,columna,matriz);
        diseñarLaberinto(fila,columna,matriz);
        masDeUnCamino(fila,columna,matriz);
    }
}
function mainresolver(){
    limpiarrecorrido(matriz);
    x=Number(document.getElementById("inicio_x").value), y=Number(document.getElementById("inicio_y").value);
    fx=Number(document.getElementById("fin_x").value), fy=Number(document.getElementById("fin_y").value);
    const visitados = Array.from({ length: fila }, () => Array(columna).fill(false));
    const padre=Array.from({length: fila}, ()=> Array(columna).fill(false));

    if(x>0 && x<fila && y>0 && y<columna && x>0 && fx<fila && y>0 && fy<columna && matriz[x][y]==="   "){
        bfs(x,y,fx,fy,visitados,padre,matriz); 
        recorrido(x,y,fx,fy,padre,matriz)
        console.log(padre);
    }else{
        alert('cuidado! alguna de las dimenciones de entrada o salida no está dentro del rango')
    }
}