// funciones auxiliares de manejo de datos 

function calcFrR(lista, item) {
    let contador = 0;
    for (let indice in lista) {
        if (parseFloat(lista[indice]) === item) {
            contador += 1;
        } else {
            continue;
        }
    }

    let arr = [1, 2, 3, 4, 4];

    for (let n in arr) {
    }
    return contador;
}

function calcFrA(fr, lista) {
    return parseFloat(fr / lista.length).toFixed(4);
}

function calcFrP(fa) {
    let decimalLargo = parseFloat(fa) * 100
    return [`${decimalLargo.toFixed(3)}%`, parseFloat(fa)];
}

function moda(objeto) {
    let numeros = [];
    let numeroYFrecuencia = [];

    for (let i in objeto.datos) {
        numeros.push(objeto.datos[i].FrR);
        numeroYFrecuencia.push([objeto.datos[i].FrR, `Variable ${objeto.datos[i].dato}`])
    }
    let max = Math.max(...numeros);

    for (let i in numeroYFrecuencia) {
        if (numeroYFrecuencia[i][0] == max) {
            max = numeroYFrecuencia[i][1];
            break;
        } else {
            continue;
        }
    }
    return max;
}

function promedio(lista) {
    let contador = 0;
    for (let i in lista) {
        contador += parseFloat(lista[i]);
    }
    contador = contador / parseInt(lista.length);
    return parseFloat(contador.toFixed(4));
}

function totalFrA(obj) {
    let contador = 0;
    for (let i in obj.datos) {
        contador += parseFloat(obj.datos[i].FrA);
    }
    return parseFloat(contador.toFixed(3));
}
function totalFrP(obj) {
    let contador = 0;
    for (let i in obj.datos) {
        contador += (parseFloat(obj.datos[i].Frp[1]) * 100);
    }

    return `${Math.floor(contador)}%`;
}

export { calcFrA, calcFrR, calcFrP, totalFrA, totalFrP, promedio, moda, }