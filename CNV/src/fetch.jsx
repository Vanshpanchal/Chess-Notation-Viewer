import React, { useState } from 'react';
import { Bounce, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import { Button, Toast } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
async function fetchIDs(userID, yearValue, monthValue, gameID) {
  let api_id_URL = `https://api.chess.com/pub/player/${userID}/games/${yearValue}/${monthValue}`
  try {
    // Fetch JSON output from api
    const response = await fetch(api_id_URL);
    const data = await response.json();
    const url = `https://www.chess.com/game/live/${gameID}`
    // Find game with same url
    for (const games of data.games) {
      if (games.url === url) {
        console.log(games.pgn)
        return games.pgn
      }
    }
    return JSON.stringify(data, null, 2)
  } catch (error) {
    // Display when error occurs
    console.log("Error fetching data:", error);
    return 'Error data';
  }
}

function GameID({ setFetchedData, setPgn }) {
  const [userID, setUserID] = useState("")
  const [monthValue, setMonthValue] = useState("")
  const [yearValue, setYearValue] = useState("")
  const [gameID, setGameID] = useState("")
  const predefinedPGNs = [
    {
      title: "Sample Game 1",
      pgn: "[Event \"F/S Return Match\"]\n[Site \"Belgrade, Serbia JUG\"]\n[Date \"1992.10.12\"]\n[Round \"2\"]\n[White \"Fischer, Robert\"]\n[Black \"Spassky, Boris\"]\n[Result \"1-0\"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. d3 d6 7. c3 O-O 8. Re1 Nb8 9. h3 Nbd7 10. Bc2 c5 11. Nbd2 b5 12. a4 Bb7 13. d4 Qc7 14. Qe2 c4 15. d5 Nc5 16. Nf1 g6 17. Bh6 Rfe8 18. Ng3 Nfd7 19. Qd2 Bf8 20. Nh2 Bxh6 21. Qxh6 Qd8 22. Ng4 Qe7 23. Rad1 Qf8 24. Qg5 f6 25. Qh4 h5 26. Ne3 Qh6 27. Rf1 Qg5 28. Qxg5 fxg5 29. axb5 axb5 30. Ra1 Ra6 31. Rxa6 Bxa6 32. Ra1 Bb7 33. Ra5 Ra8 34. Rxb5 Ra1+ 35. Kh2 Ra2 36. Nxc4 Ba6 37. Rb8+ Nxb8 38. Nxd6 Nbd7 39. b4 h4 40. bxc5 hxg3+ 41. Kxg3 Nxc5 42. Bb1 Rb2 43. Bc2 Bd3 44. Bxd3 Nxd3 45. f3 Nf4 46. c4 Kf7 47. c5 Ke7 48. h4 gxh4+ 49. Kxh4 Nxg2+ 50. Kg5 Nxe3 51. Kxg6 Rg2+ 52. Kh5 Kd7 53. Kh4 Rg1 54. Kh3 Rg7 55. Kh4 Nf1 56. Kh5 Ke7 57. Kh6 Rg1 58. Kh5 Kf6 59. Kh4 Rg2 60. Kh3 Rg3+ 61. Kh4 Rxf3 62. d6 Rf4+ 63. Kh5 Rxe4 64. d7 Ke7 65. c6 Rc4 66. Kg6 e4 67. Kf5 e3 68. Ke5 e2 69. Kd5 Rc1 70. d8=Q+ Kxd8 71. Kd6 e1=Q 72. c7+ Rxc7 73. Kd5 Qd2+ 74. Ke4 Re7+ 75. Kf3 Qe3+ 76. Kg4 Rg7+ 77. Kf5 Rg5+ 78. Kf6 Qe5+ 79. Kf7 Rg7+ 80. Kf8 Qe7# 1-0",
    },
    {
      title: "Sample Game 2",
      pgn: "[Event \"World Championship\"]\n[Site \"New York\"]\n[Date \"1957.12.12\"]\n[Round \"12\"]\n[White \"Petrosian, Tigran\"]\n[Black \"Spassky, Boris\"]\n[Result \"1-0\"]\n\n1. e4 c5 2. Nf3 Nc6 3. Bb5 e6 4. O-O Nf6 5. d3 Be7 6. Nbd2 O-O 7. Bxc6 dxc6 8. Ne5 Nd7 9. Nxd7 Bxd7 10. f4 c5 11. Nf3 Bc6 12. Qe1 b5 13. Ne5 Bb7 14. a4 a6 15. Be3 f6 16. Nf3 c4 17. Nd4 Qd7 18. Qg3 cxd3 19. cxd3 c5 20. Nf3 Qxd3 21. Rfe1 Qxe4 22. Bf2 Qf5 23. Nh4 Qh5 24. Rxe6 Rfe8 25. Rae1 Qf7 26. f5 Bf8 27. Ng6 Rxe6 28. Rxe6 Re8 29. Qe3 Rxe6 30. fxe6 Qxg6 31. g3 Qb1+ 32. Be1 Be7 33. Kf2 Qf5+ 34. Kg1 Qd5 35. Kf1 Qg2# 1-0",
    },
  ];
  // Get input value on click
  const click = async () => {
    const data = await fetchIDs(userID, yearValue, monthValue, gameID)
    setFetchedData(typeof data === 'string' ? data : data.pgn)
    
  }
  const changeUserID = event => {
    setUserID(event.target.value)
  }

  const changeMonth = event => {
    setMonthValue(event.target.value)
  }

  const changeYear = event => {
    setYearValue(event.target.value)
  }

  const changeGameID = event => {
    setGameID(event.target.value)
  }


  const inputPGN = event => {
    setPgn(event.target.value)
  }
  const copyToClipboard = (pgn) => {
    navigator.clipboard.writeText(pgn).then(() => {
      toast.success("PGN copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
      });
    });
  };
  /* Display clickable button */
  return (
    <div className="AppContainer">
      <div className='inputContainer'>
        <textarea
          onChange={inputPGN}
          className="form-control"
          placeholder="Paste your PGN here..."
          rows={10}
        ></textarea>
        <button className="btn btn-primary btn-block mt-3" onClick={
          click
        }>Load PGN</button>
      </div>
      <div className="predefinedPGNs mt-3">
        <h5>Predefined PGNs:</h5>
        {predefinedPGNs.map((item, index) => (
          <div className="mt-2" key={index}>
            <Button
              variant="outline-secondary"
              className="btn-block"
              onClick={() => copyToClipboard(item.pgn)}
            >
              {item.title}
            </Button>
          </div>
        ))}
      </div>

      <ToastContainer stacked='true' autoClose='1000' transition={Zoom}></ToastContainer>

    </div >
  )
}

export default GameID