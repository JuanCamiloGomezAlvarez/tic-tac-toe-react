import { useState } from "react"

const TURNOS = {
  X: "x",
  O: "o"
}

const Square = ({ children, isSelected, updateBoard, index})=>{
  const className = `square ${isSelected ? "is-selected": ""}`

  const handleClick = () => {
    updateBoard()
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setboard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNOS.X)

  const updateBoard = () => {
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
  }

  return(
    <main className="board">
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
    </main>

  ) 

}

export default App
