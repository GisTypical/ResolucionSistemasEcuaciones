/**
 * Configuración de MathJax
 */
var MathJax = {
    tex: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
    },
};

var resultadoTabla = document.getElementById(`resultadoTabla`);
var cargarBut = document.getElementById(`cargar`);
var enviarBut = document.getElementById(`enviar`);

cargarBut.onclick = (e) => {
    const input = document.getElementById(`datos`).value;
    const ecuaciones = input.split(",");
    let matriz = [];
    let ind = [];
    for (let i = 0; i < ecuaciones.length; i++) {
        matriz.push(ecuaciones[i].split(" "));
        while (matriz[i][0] == "") {
            matriz[i].shift();
        }
        ind.push(matriz[i].pop());
    }
    /* Convertir valores de la matriz de String a Number */
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] = +matriz[i][j];
        }
        ind[i] = +ind[i];
    }
    /* Mostrar la Matriz en la página */
    imprimirMatriz(matriz, ind);
    /* Guardar los datos en un objeto */
    var datos = {
        coef: matriz,
        ind: ind
    };
    enviarBut.onclick = (e1) => {
        if (verificarMatriz(matriz) && !ind.some(isNaN)) {
            envio(datos);
        } else {
            console.error(`La matriz a enviar contiene errores.`);
        }
    };
};


function envio(data) {
    const options = {
        method: `post`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(`/envio`, options)
        .then((response) => {
            return response.json();
        })
        .then((respuesta) => {
            resultadoTabla.style = `block`;
            var spanRes = document.getElementById(`resultado`);
            if (respuesta.some(tieneSol)) {
                spanRes.textContent = `El sistema de ecuaciones no tiene solución`
            } else {
                for (let i = 0; i < respuesta.length; i++) {
                    respuesta[i] = respuesta[i].toFixed(3);
                }
                var respuestaMatriz = respuesta.join(" \\\\ ");
                spanRes.textContent = `$$\\begin{bmatrix} ${respuestaMatriz} \\end{bmatrix}$$`;
            }
            MathJax.typeset();
        });
}

function verificarMatriz(matriz) {
    let boolnum = true;
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i].some(isNaN)) {
            boolnum = false;
            break;
        }
    }
    return boolnum;
}

function tieneSol(element) {
    return element == null;
}

function imprimirMatriz(matriz, ind) {
    var filasLatex = [];
    var indAux = Array.from(ind);
    for (const fila of matriz) {
        filasLatex.push(fila.join(" & ") + " & : & " + indAux.shift());
    }
    var matrizLatex = filasLatex.join(" \\\\ ");
    var carga_Tabla = document.getElementById('cargaTabla');
    carga_Tabla.style = 'block';
    var cargarMatriz = document.getElementById(`matriz`);
    cargarMatriz.textContent = "$$\\begin{bmatrix}" + matrizLatex + "\\end{bmatrix}$$";
    MathJax.typeset();
}