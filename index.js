const express = require(`express`);
const server = express();

const port = 3000;

server.listen(port, () => { console.log(`Escuchando en puerto ${port}`) });

server.use(express.static(`client`));

server.use(express.json({ limit: `1mb` }));

server.post(`/envio`, (request, response) => {
    console.log(`Se ha recibido: `);
    console.log(request.body);
    const coef = request.body.coef;
    const x = request.body.ind;
    const resultado = eliminacionGauss(coef, x);
    console.log(`Se ha enviado: `);
    console.log(resultado);
    response.json(resultado);
});

var abs = Math.abs;

function llenarArray(i, n, v) {
    var a = [];
    for (; i < n; i++) {
        a.push(v);
    }
    return a;
}

function eliminacionGauss(coef, x) {

    var i, k, j;

    for (i = 0; i < coef.length; i++) {
        coef[i].push(x[i]);
    }
    var n = coef.length;

    for (i = 0; i < n; i++) {
        var maxEl = abs(coef[i][i]),
            maxRow = i;
        for (k = i + 1; k < n; k++) {
            if (abs(coef[k][i]) > maxEl) {
                maxEl = abs(coef[k][i]);
                maxRow = k;
            }
        }


        // Cambiar la fila maxima con la fila actual
        for (k = i; k < n + 1; k++) {
            var tmp = coef[maxRow][k];
            coef[maxRow][k] = coef[i][k];
            coef[i][k] = tmp;
        }

        // Hacer todas las filas 0
        for (k = i + 1; k < n; k++) {
            var c = -coef[k][i] / coef[i][i];
            for (j = i; j < n + 1; j++) {
                if (i === j) {
                    coef[k][j] = 0;
                } else {
                    coef[k][j] += c * coef[i][j];
                }
            }
        }
    }

    x = llenarArray(0, n, 0);
    for (i = n - 1; i > -1; i--) {
        x[i] = coef[i][n] / coef[i][i];
        for (k = i - 1; k > -1; k--) {
            coef[k][n] -= coef[k][i] * x[i];
        }
    }

    return x;
}