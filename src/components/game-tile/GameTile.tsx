import './GameTile.scss';

type GameTileProps = {
  value: string;
  onPlay: () => void;
  highlight: boolean;
};

export default function GameTile({ value, onPlay, highlight }: GameTileProps) {
  return (
    <li className={highlight ? 'highlight' : ''} onClick={onPlay}>
      {value}
    </li>
  );
}
