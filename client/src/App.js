import React, { useState } from 'react';
import Help from './Help';
import Input from './Input';
import Post from './Post';

const App = () => {
    const [values, setValues] = useState({ matrix: [], ind: [] });
    return (
        <div>
            <Help />
            <Input values={values} onChangeValues={setValues} />
            <Post values={values} />
        </div>
    )
}

export default App;