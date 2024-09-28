import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Bounce, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { FaChevronLeft, FaChevronRight, FaFastBackward, FaFastForward } from 'react-icons/fa';

import { Chessboard } from 'react-chessboard';
import ChessParse from '/src/parse.jsx';

export default function ChessLogic({ fetchedData, pgn }) {
  console.log(pgn)
  const moveNotation = ChessParse({ fetchedData, pgn })
  const [game] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(-1);


  const nextMove = () => {
    if (moveIndex < moveNotation.length - 1) {
      const move = moveNotation[moveIndex + 1];
      game.move(move.notation.notation);
      setMoveIndex(prevIndex => prevIndex + 1);
    } else {
      console.log("No more available moves");
      toast.info("No more available moves");
    }
  }

  const undoMove = () => {
    if (moveIndex > -1) {
      game.undo();
      setMoveIndex(prevIndex => prevIndex - 1);
    } else {
      console.log("No more available moves to undo");
      toast.info("No more available moves to undo")
    }
  }

  const resetMoves = () => {
    setMoveIndex(-1);
    game.reset()
    console.log("Reset");
    toast.info("Reset")
  }

  const fastForward = () => {
    const fastForwardStep = (index) => {
      if (index < moveNotation.length - 1) {
        const move = moveNotation[index + 1];
        if (game.move(move.notation.notation)) {
          setMoveIndex(index + 1);
          setTimeout(() => {
            fastForwardStep(index + 1);
          }, 500);
        } else {
          console.log("Invalid move:", move.notation.notation);
          toast.error("Invalid move")
        }
      }
    };

    fastForwardStep(moveIndex);
  };

  return (
    <>
      <div className="chessContainer">
        <div className='chessBoard'>
          <Chessboard className="basicBoard" position={game.fen()} arePiecesDraggable={false} />
        </div>
        <div className='buttonContainer'>
          <div>
            <button className='rewindButton' onClick={resetMoves}>
              <FaFastBackward />
            </button>
            <button className='undoButton' onClick={undoMove}>
              <FaChevronLeft />
            </button>
            <button className='nextButton' onClick={nextMove}>
              <FaChevronRight />
            </button>
            <button className='ffButton' onClick={fastForward}>
              <FaFastForward />
            </button>
          </div>
        </div>
        <ToastContainer stacked='true' autoClose='1000' transition={Zoom}></ToastContainer>
      </div>
    </>
  )
}
