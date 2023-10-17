"use strict";

console.log("----------------------------------------");
console.log("Fetch Poke JSON");

function primerLetraMayus(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


fetch("./bulbasaur.json")
  .then(response => {
    if (response.ok)
      return response.json();
    else
      throw new Error (response.status);
  })
  .then(data => {
    // TOMO EL NOMBRE DEL JSON Y SE LO PASO AL HTML
    const nombre = primerLetraMayus(data.name);
    document.querySelector("#pokeName").textContent = nombre;

    
    // TOMO LOS DOS TIPOS QUE TIENE EL POKEON, ARMO UNA
    // TABLA Y LE PASO LOS TIPOS PARA MOSTRAR EN EL HTML
    const tipo1 = primerLetraMayus(data.types[0].type.name);
    const tipo2 = primerLetraMayus(data.types[1].type.name);

    // En este elemento del html voy meter la tabla y titulo
    const pokeTypes = document.querySelector("#pokeTypes");

    // Esta es la table donde meto las filas y celdas
    const tabla = document.createElement("table");
    
    // Creo fila, celda, adjudico contenido a la celda
    // meto la celda en la fila y la fila en la tabla
    const fila = document.createElement("tr");
    const celda1 = document.createElement("td");
    celda1.textContent = tipo1;
    fila.appendChild(celda1);
    tabla.appendChild(fila);

    const fila2 = document.createElement("tr")
    const celda2 = document.createElement("td");
    celda2.textContent = tipo2;
    fila2.appendChild(celda2);
    tabla.appendChild(fila2)
    
    // Creo un elemento span, le doy contenido y lo meto en
    // el div "pokeTypes"
    const titulo = document.createElement("span");
    titulo.textContent = "Tipo(s):";
    pokeTypes.appendChild(titulo);

    // Meto la tabla en el div "pokeTypes"
    pokeTypes.appendChild(tabla);

    //-------------------------------------
    
    // MANEJO DE LAS CARACTERISTICAS DEL POKEMON
    // Armo dos arrays con los datos de los datos del json que necesito.
    // Para eso uso la lógica data.stats[0].stat.name para accerder al
    // dato en cuestion.
    // Con MAP recorro todos los objetos en DATA.STATS y dentro de cada
    // objeto busco el dato que necesito. El objeto toma el nombre 
    // temporario "STATNAME" y con la ruta STATNAME.STAT.NAME se
    // accede al dato buscado.
    // Entonces de cada objeto saco un dato y se arma el array.
    const statNames = data.stats.map(statName => primerLetraMayus(statName.stat.name));
    const bases = data.stats.map(base => base.base_stat);

    // Llamo al div "pokeStats" donde voy a meter la tabla con las caracteristicas
    const pokeStats = document.querySelector("#pokeStats");

    // Creo la tabla y lineas
    const tablaStats = document.createElement("table");
    const lineaStats = document.createElement("tr");

    // Creo las celdas (th-table header- en vez de td-table data cell-
    // solo por formato) y le agrego a cada celda el dato del array
    // que se genero previamente con los datos de los objetos usando MAP
    statNames.forEach(nameSt => {
      const nombreStat = document.createElement("th");
      nombreStat.textContent = nameSt;
      // Agrego cada celda a la linea
      lineaStats.appendChild(nombreStat);
    });

    // Agrego la linea a la tabla 
    tablaStats.appendChild(lineaStats);

    const lineaBase = document.createElement("tr");

    bases.forEach(baseSt => {
      const baseCadaSt = document.createElement("th");
      baseCadaSt.textContent = baseSt;
      lineaBase.appendChild(baseCadaSt);
    });

    tablaStats.appendChild(lineaBase);

    // Agrego la tabla compelta al div "pokeStats"
    pokeStats.appendChild(tablaStats);
  })
  .catch(error => {
    console.error(error);
  })