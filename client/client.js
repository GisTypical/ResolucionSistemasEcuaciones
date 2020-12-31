var MathJax = {
    tex: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
    },
};

var cargarBut = document.getElementById(`cargar`);
var enviarBut = document.getElementById(`enviar`);

cargarBut.onclick = () => {
    const input = document.getElementById(`datos`).value;
    const ecuaciones = input.split(",");
    let matrix = [];
    let ind = [];
    for (let i = 0; i < ecuaciones.length; i++) {
        matrix.push(ecuaciones[i].split(" "));
        /* Filtro para dejar Numbers solamente en la matriz*/
        matrix[i] = matrix[i].filter(Number);
        ind.push(matrix[i].pop());
    }
    matrix = matrix.map(row => row.map(el => +el));
    ind = ind.map((el) => +el);
    /* Mostrar la Matriz en la página */
    imprimirMatriz(matrix, ind);
    enviarBut.onclick = () => {
        envio(matrix, ind);
    };
};

function envio(matrix, ind) {
    let datos = {
        coef: matrix,
        ind: ind
    };
    const options = {
        method: `post`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    };
    fetch(`/envio`, options)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            document.getElementById(`resultadoTabla`).style = `block`;
            let spanRes = document.getElementById(`resultado`);
            if (response.some(el => el == null)) {
                spanRes.textContent = `El sistema de ecuaciones no tiene solución`
            } else {
                for (let i = 0; i < response.length; i++) {
                    response[i] = response[i].toFixed(4);
                }
                let respuestaMatriz = response.join(" \\\\ ");
                spanRes.textContent = `$$\\begin{bmatrix} ${respuestaMatriz} \\end{bmatrix}$$`;
            }
            MathJax.typeset();
        });
}

function imprimirMatriz(matriz, ind) {
    const filasLatex = [];
    let indAux = Array.from(ind);
    for (const fila of matriz) {
        filasLatex.push(fila.join(" & ") + " & : & " + indAux.shift());
    }
    let matrizLatex = filasLatex.join(" \\\\ ");
    document.getElementById('cargaTabla').style = 'block';
    let cargarMatriz = document.getElementById(`matriz`);
    cargarMatriz.textContent = "$$\\begin{bmatrix}" + matrizLatex + "\\end{bmatrix}$$";
    MathJax.typeset();
}