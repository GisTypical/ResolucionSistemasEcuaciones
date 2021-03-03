import Latex from 'react-latex'

let eqSys = "$\\begin{cases} x + 5y = 5 \\\\ 3x - 5y = 3\\end{cases} $";

const Help = () => {
  return (
    <div className="help">
      <div className="titulo">
        <h1>Resolución de Sistemas de Ecuaciones <Latex>$n \times n$</Latex></h1>
      </div>
      <div className="info">
        <p>
          En el siguiente <strong>textbox</strong> se ingresan coeficientes del
          sistema de ecuaciones de la siguiente manera:
          <code> « x y z, a b c, ... n »</code> siendo los ultimos números
          <em> terminos independientes</em>. Primero se tiene que <strong>cargar la tabla</strong> y luego <strong>envia</strong> al servidor.
        </p>
        <p>Nota: <em>Caracteres que no sean números serán ignorados</em></p>
        <p>
          <em>Por ejemplo:</em> <code>1 5 5, 3 -5 3</code> es igual a <Latex>{eqSys}</Latex>
        </p>
      </div>
    </div>
  );
}

export default Help;
