// modulo de funciones para manejo de datos
import {calcFrA, calcFrR, calcFrP, totalFrA, totalFrP, promedio, moda,} from "./helpers.js";

// variables y constantes globales

const contenedor = document.querySelector(".container"),
form = document.querySelector("form"),
separador = document.getElementById("sep"),
datos = document.getElementById("data"),
tabla = document.querySelector(".tabla"),
btnCrear = document.querySelector("button");


//Funciones


function array(e){
    e.preventDefault();
    if(data.value === ""){
        return alert("Por favor rellena los Campos")
    }
    let separar = separador.value || " ",
    datos = data.value;
    let listaDatos = datos.split(separar);
    listaDatos = listaDatos.filter(res => !isNaN(parseFloat(res)))
    if(listaDatos.length <= 0){
        return alert("Al parecer la informacion no puede ser procesada intentalo de nuevo");
    }
    form.reset();
    form.style.display = "none";
    return calcular(listaDatos);
}

function crear(obj){
    let fragment = document.createDocumentFragment();
    tabla.classList.remove("tabla");
    tabla.classList.add("ver-tabla");
    let thead = tabla.querySelector("thead");
    let tbody = tabla.querySelector("tbody");
    let tfoot = tabla.querySelector("tfoot");

    tabla.appendChild(tbody, tfoot);

    for(let i in obj.datos){
        let fila = document.createElement("tr");
        let cDato = document.createElement("td");
        let cFr = document.createElement("td");
        let cfa = document.createElement("td");
        let cfp = document.createElement("td");

        cDato.innerHTML = `Variable ${obj.datos[i].dato}`;
        cFr.innerHTML = String(obj.datos[i].FrR);
        cfa.innerHTML = String(obj.datos[i].FrA);
        cfp.innerHTML = String(obj.datos[i].Frp[0]);

        fila.appendChild(cDato);
        fila.appendChild(cFr);
        fila.appendChild(cfa);
        fila.appendChild(cfp);

        fragment.appendChild(fila);
    }
    tbody.appendChild(fragment);
    let rowTotal = document.createElement('tr');
    let celdaTotal = document.createElement("td");
    let celdaFrR = document.createElement("td");
    let celdaFrA = document.createElement("td");
    let celdaFrP = document.createElement("td");

    celdaTotal.innerHTML = "Total";
    celdaFrR.innerHTML = obj.FrR;
    celdaFrA.innerHTML = obj.FrATotal;
    celdaFrP.innerHTML = obj.FrPTotal



    rowTotal.appendChild(celdaTotal);
    rowTotal.appendChild(celdaFrR);
    rowTotal.appendChild(celdaFrA);
    rowTotal.appendChild(celdaFrP);
    tfoot.appendChild(rowTotal);

    let parrafo = document.createElement("p");
    parrafo.innerHTML = `<b>Moda</b>: ${obj.modaData}, <b>Promedio</b>: ${obj.promedio}`;
    contenedor.insertBefore(parrafo, tabla);

    let botonReload = document.createElement("button");
    botonReload.innerHTML = "Crear otra tabla";
    botonReload.id = "reload";
    contenedor.insertAdjacentElement("beforeend", botonReload);

}

function calcular(lista){
    // devuelve un objeto con los datos y sus variables estadisticas calculadas
    let objInf = {
        informacion : lista,
        datos : Array.from(new Set(lista)),
    }

    let objFinal = {datos : {}};
    objFinal.lista = objInf.informacion;
    objInf.datos.forEach(num =>{
        objFinal.datos[`numero${num}`]={
            dato : parseFloat(num),
            FrR : calcFrR(objInf.informacion, parseFloat(num)),     
        }
    })

    objFinal.promedio = promedio(objFinal.lista);
    for(let i in objFinal.datos){
        objFinal.datos[i].FrA = calcFrA(objFinal.datos[i].FrR, objFinal.lista);
        objFinal.datos[i].Frp = calcFrP(objFinal.datos[i].FrA);
    }
    objFinal.modaData = moda(objFinal);
    objFinal.FrR = objFinal.lista.length
    objFinal.FrATotal = totalFrA(objFinal);
    objFinal.FrPTotal = totalFrP(objFinal);
    return crear(objFinal);
}


//Eventos

btnCrear.addEventListener("click", array)

contenedor.addEventListener("click", function(e){
    if(e.target.matches("#reload")){
        location.reload();
    }else{
        return false;
    }
})