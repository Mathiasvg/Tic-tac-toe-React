import { useState } from 'react';
import './App.scss';
import { GameBoard } from './components';
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';

export default function App() {
  const [playingFieldStatus, setPlayingFieldStatus] = useState<string[]>(
    Array(9).fill('')
  );
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const explosionConfig: ConfettiProps = {
    force: 0.8,
    duration: 5000,
    particleCount: 300,
    width: 2000,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
  };

  const handlePlay = (index: number) => {
    if (playingFieldStatus[index]) {
      return;
    }
    currentPlayer
      ? setPlayingFieldStatus((pfs) => {
          pfs[index] = 'O';
          return [...pfs];
        })
      : setPlayingFieldStatus((pfs) => {
          pfs[index] = 'X';
          return [...pfs];
        });

    changePlayer();
  };

  const changePlayer = () => setCurrentPlayer((cp) => (cp + 1) % 2);
  const replay = () => setPlayingFieldStatus(Array(9).fill(''));

  const currentPlayerName = `Player ${currentPlayer + 1}`;
  const winningSelection = calculateWinner(playingFieldStatus);
  const winningPlayer = getWinningPlayer(winningSelection, playingFieldStatus);
  const endOfGame = !!winningPlayer || !playingFieldStatus.includes('');

  const endGameStatus = winningPlayer ? (
    <div className="winner-container">
      <h2>{winningPlayer} wins</h2>
      <ConfettiExplosion {...explosionConfig} />
    </div>
  ) : endOfGame ? (
    <h2>It's a draw</h2>
  ) : null;

  return (
    <>
      <h1 id="gameTitle">Let's play Tic Tac Toe</h1>

      {endGameStatus}

      <GameBoard
        board={playingFieldStatus}
        onPlay={handlePlay}
        highlight={winningSelection ? winningSelection : []}
        disabled={endOfGame}
      />

      {endOfGame ? (
        <button onClick={replay}>Replay</button>
      ) : (
        <p>Your turn, {currentPlayerName}</p>
      )}
    </>
  );
}

function calculateWinner(board: string[]): number[] | null {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return winConditions[i];
    }
  }

  return null;
}

function getWinningPlayer(
  winningSelection: number[] | null,
  board: string[]
): string | null {
  if (!winningSelection) {
    return null;
  }
  const winner = board[winningSelection[0]];
  return winner === 'X' ? 'Player 1' : 'Player 2';
}
