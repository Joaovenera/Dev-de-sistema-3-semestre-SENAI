type DisplayProps = {
  value: string;
};

export default function Display({ value }: DisplayProps) {
  return (
    <div className="display-container" >
      <div>{value}</div>
    </div>
  );
}
