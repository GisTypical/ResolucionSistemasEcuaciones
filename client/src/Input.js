import React, { useState } from 'react';
import Latex from "react-latex";

const Input = (props) => {
    const [equations, setEquations] = useState("");

    let handleChange = (event) => {
        const { value } = event.target;
        const ecuaciones = value.split(",");
        let matrixValues = [];
        let indValues = [];
        for (const [i, ecuacion] of ecuaciones.entries()) {
            matrixValues.push(ecuacion.split(" "));
            matrixValues[i] = matrixValues[i].filter(Number);
            indValues.push(matrixValues[i].pop());
        }
        matrixValues = matrixValues.map(row => row.map(el => +el));
        indValues = indValues.map((el) => +el);
        props.onChangeValues({ matrix: matrixValues, ind: indValues })
        printMatrix(matrixValues, indValues);
    }

    function printMatrix(matriz, ind) {
        const latexRows = [];
        let indAux = Array.from(ind);
        for (const fila of matriz) {
            latexRows.push(fila.join(" & ") + " & : & " + indAux.shift());
        }
        let matrizLatex = `$$\\begin{bmatrix}${latexRows.join(" \\\\ ")}\\end{bmatrix}$$`
        setEquations(matrizLatex);
    }

    return (
        <div>
            <form className="inputStyle">
                <input type='text' placeholder="Sistema de Ecuaciones" onChange={handleChange} />
                <input type="button" className="button" value="Ver Matriz" />
            </form>
            <div className="matrix">
                <Latex>{`${equations}`}</Latex>
            </div>
        </div>
    )
}

export default Input;