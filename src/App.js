import { useState } from 'react';
//Recibe un valor de la posicion 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//Va poniendo los valores tomando en cuenta los turnos 
function Board({ xIsNext, squares, onPlay }) {
  //Funcion que asigna los valores a las posiciones
  function handleClick(i) {
    //Llama a la funcion que verifica si ya existe un ganador o no
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //Define los turnos  
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    //Regresa el valor del siguiente turno
    onPlay(nextSquares);
  }
//Funcion para definir el mensaje a mostrar en pantalla
  const winner = calculateWinner(squares);
  //Define la variable para guardar el valor del estado del juego
  let status;
  if (winner) {
    //Si ya hay ganador muestra lo siguiente en pantalla, asignando en valor del ganador
    status = 'Winner: ' + winner;
  } else {
    //En caso de que no haya ganador muestra el siguiente turno
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
//Muestra los siguientes valores en pantalla
  return (
    //Empieza codigo html donde imprime el estado y el tablero de juego
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//Funcion que guarda los datos del juego
export default function Game() {
  //Guarda la historia de los movimientos
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //Checa los movimientos que se van haciendo
  const [currentMove, setCurrentMove] = useState(0);
  //Hace la division para comparar para el siguiente movimiento
  const xIsNext = currentMove % 2 === 0;
  //Checa el valor de los cuadros actuales
  const currentSquares = history[currentMove];
  //Funcion que va llevando los registros de los movimientos
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  //Funcion que determina el siguiente movimiento
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//Funcion para regresar a un unto especifico leendo la historia del juego
  const moves = history.map((squares, move) => {
    //Declara la variable
    let description;
    //Compara el valor para volvere imprime los valores para volver
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      //Vuelve al punto del juego que seleccione el usuario
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
//Imprime todos los procesos en pantalla
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//Funcion que da el ganador del juego comparando los valores
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //Recorre los valores buscando a un posible ganador del juego
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
