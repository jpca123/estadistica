// modulo de funciones para manejo de datos
import {calcFrA, calcFrR, calcFrP, totalFrA, totalFrP, promedio, moda,} from "./helpers.js";

// variables y constantes globales

const contenedor = document.querySelector(".container"),
form = document.querySelector(".form"),
separador = document.getElementById("sep"),
datos = document.getElementById("data"),
tabla = document.querySelector(".tabla"),
tablaInfo = document.querySelector('.tabla-info'),
btnCrear = document.querySelector("button");


//Funciones

// lee los datos, los filtra y retorna un array
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
        form.reset();
        return alert("Al parecer la informacion no puede ser procesada intentalo de nuevo");
    }

    form.reset();
    cambiarInterfaz();
    return calcular(listaDatos);
}

function crear(obj){

    // informacion variables
    let fragment = document.createDocumentFragment();
    let tbody = tabla.querySelector("tbody");
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

    // informacion total
    let listaCeldasTFoot = tabla.querySelector('tfoot').firstElementChild.children;
    listaCeldasTFoot[1].innerHTML = obj.FrR;
    listaCeldasTFoot[2].innerHTML = obj.FrATotal;
    listaCeldasTFoot[3].innerHTML = obj.FrPTotal

    // informacion general
    tablaInfo.innerHTML = `<strong>Moda</strong>: ${obj.modaData}, <strong>Promedio</strong>: ${obj.promedio}`;
}

// devuelve un objeto con los calculos resueltos y las variables 
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


function cambiarInterfaz(){
    contenedor.classList.toggle('none');
    form.classList.toggle('none');

    tabla.querySelector('tbody').innerHTML = '';
}


//Eventos

document.addEventListener("submit", array)

contenedor.addEventListener("click", function(e){
    if(e.target.matches("#reload")){
        cambiarInterfaz();
    }else{
        return false;
    }
})