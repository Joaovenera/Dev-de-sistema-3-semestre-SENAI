import Button from "./Button";

type ButtonsPanelProps = {
  onClick: (button: string) => void;
};

export default function ButtonsPanel({ onClick }: ButtonsPanelProps) {
  return (
    <div className="panel">
      <Button id="AC" name="AC" onClick={onClick} />
      <Button name="/" onClick={onClick} />
      <Button name="7" onClick={onClick} />
      <Button name="8" onClick={onClick} />
      <Button name="9" onClick={onClick} />
      <Button name="x" onClick={onClick} />
      <Button name="4" onClick={onClick} />
      <Button name="5" onClick={onClick} />
      <Button name="6" onClick={onClick} />
      <Button name="-" onClick={onClick} />
      <Button name="1" onClick={onClick} />
      <Button name="2" onClick={onClick} />
      <Button name="3" onClick={onClick} />
      <Button id="plus" name="+" onClick={onClick} />
      <Button name="0" onClick={onClick} />
      <Button name="." onClick={onClick} />
      <Button id="equal" name="=" onClick={onClick} />
    </div>
  );
}
