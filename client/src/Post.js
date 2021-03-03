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
                if (!response.data.includes(null)) {
                    let data = response.data.map(value => value.toFixed(4));
                    let latex_results = `$$\\begin{bmatrix}${data.join(" \\\\ ")}\\end{bmatrix}$$`;
                    setResults(latex_results);
                } else {
                    setResults(`$$SE~indeterminado~o~incompatible$$`);
                }
            })
    }

    return (
        <div className="post">
            <button className="button" onClick={fetchData} >Resolver sistema</button>
            <div className="matrix">
                <Latex>{`${results}`}</Latex>
            </div>
        </div>
    )
}

export default Post;