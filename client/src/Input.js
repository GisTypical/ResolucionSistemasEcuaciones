import React, { useState } from 'react';
import Latex from "react-latex";

const Input = (props) => {
    const [equations, setEquations] = useState("");

    let handleChange = (event) => {
        const { value } = event.target;
        if (value === "") return;
        const equations = value.split(",");
        let matrixValues = [];
        let indValues = [];
        for (const [i, eq] of equations.entries()) {
            matrixValues.push(eq.split(" "));
            matrixValues[i] = matrixValues[i].filter(Number);
            indValues.push(matrixValues[i].pop());
        }
        matrixValues = matrixValues.map(row => row.map(el => +el));
        indValues = indValues.map((el) => +el);
        props.onChangeValues({ matrix: matrixValues, ind: indValues })
        printMatrix(matrixValues, indValues);
    }

    function printMatrix(matriz, ind) {
        if (ind.includes(NaN)) {
            ind.pop();
            ind.push(0);
        }
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
            <form className="formStyle" onSubmit={e => e.preventDefault()} >
                <input onKeyDown={handleChange} type='text' placeholder="Ingresar Sistema de Ecuaciones" onChange={handleChange} />
            </form>
            <div className="matrix">
                <Latex>{`${equations}`}</Latex>
            </div>
        </div>
    )
}

export default Input;