import React, { useState } from "react";
import axios from 'axios';
import Latex from 'react-latex';

const Post = (props) => {
    const { matrix, ind } = props.values;
    const [results, setResults] = useState([]);

    const fetchData = () => {
        axios.post('/envio', {
            matrix: matrix,
            ind: ind
        })
            .then(function (response) {
                let datos = response.data.map(value => value.toFixed(4));
                let respuestaMatriz = `$$\\begin{bmatrix}${datos.join(" \\\\ ")}\\end{bmatrix}$$`;
                setResults(respuestaMatriz);
            })
    }

    return (
        <div className="fetch">
            <button className="button" onClick={fetchData} >Resolver sistema</button>
            <Latex>{`${results}`}</Latex>
        </div>
    )
}

export default Post;