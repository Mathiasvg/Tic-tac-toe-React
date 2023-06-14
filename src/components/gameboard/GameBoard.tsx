import { GameTile } from '../game-tile';
import './GameBoard.scss';

type GameBoardProps = {
  board: string[];
  onPlay: (index: number) => void;
  highlight: number[];
  disabled: boolean;
};

export default function GameBoard({
  board,
  onPlay,
  highlight,
  disabled,
}: GameBoardProps) {
  return (
    <div className={'playing-field-container ' + (disabled ? 'disabled' : '')}>
      <ul>
        {board.map((x, i) => (
          <GameTile
            key={i}
            value={x}
            highlight={highlight.includes(i)}
            onPlay={() => onPlay(i)}
          />
        ))}
      </ul>
    </div>
  );
}
