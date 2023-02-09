import { useState } from "react"

const TURNOS = {
  X: "x",
  O: "o"
}

const Square = ({ children, isSelected, updateBoard, index})=>{
  const className = `square ${isSelected ? "is-selected": ""}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
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

  const updateBoard = (index) => {
    // esta linea sirve para impedir que se sobre escriba el board seleccionado
    if(board[index] || winner)return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
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
