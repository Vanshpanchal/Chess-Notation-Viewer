import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChessLogic from './chess';
import GameId from './fetch'

function App() {
  const [fetchedData, setFetchedData] = useState('');
  const [pgn, setPgn] = useState('');

  return (
    <>
      <div className="chess-page">
        {/* Header */}
        <header className="bg-dark text-white py-1">
          <div className="container text-center">
            <h1 className="display-4">Chess PGN Viewer</h1>
            <p className="lead">Analyze and view chess games with ease</p>
          </div>
        </header>

        {/* Main Section */}
        <main className="container-fluid my-5">
          <div className="row align-items-stretch">
            {/* PGN Input Section */}
            <div className="col-12 col-md-6 d-flex mb-4 mb-md-0">
              <div className="card shadow-lg p-3 bg-white rounded w-100 h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">PGN Input</h5>
                  <GameId className="gameID" setFetchedData={setFetchedData} setPgn={setPgn} />
                </div>
              </div>
            </div>

            {/* Chessboard Section */}
            <div className="col-12 col-md-6 d-flex">
              <div className="card shadow-lg p-3 bg-white rounded chessboard-section w-100 h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">Chessboard</h5>
                  <div className="boardContainer">
                    <ChessLogic fetchedData={fetchedData} pgn={pgn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3">
          <p>&copy; 2024 Chess PGN Viewer | Designed for Chess Enthusiasts</p>
        </footer>
      </div>
    </>
  )
}

export default App
