import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNOS, WINER_COMBOS } from "./constants.js"

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNOS.X)

  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {
    for(const combo of WINER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNOS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // esta linea sirve para impedir que se sobre escriba el board seleccionado
    if(board[index] || winner) return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return(
    <main className="board">
      <button onClick={resetGame}>Reiniciar</button>
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNOS.X}>
          {TURNOS.X}
        </Square>
        <Square isSelected={turn === TURNOS.O}>
        {TURNOS.O}
        </Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? "Empate"
                  : "Ganó: " 
                }
              </h2>  
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>

  ) 

}

export default App
