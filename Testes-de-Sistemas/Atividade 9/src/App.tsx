import { useRef, useState } from "react";
import Display from "./components/Display";
import ButtonsPanel from "./components/ButtonsPanel";
import { isNumber } from "./utils/isNumber";
import { isDot } from "./utils/isDot";
import { removeZeroLeft } from "./utils/removeZeroLeft";
import { calculate } from "./utils/calculate";

function App() {
  const [displayNumber, setDisplayNumber] = useState<string | null>(null);
  const [accumulator, setAccumulator] = useState<string>("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [showingResult, setShowingResult] = useState<boolean>(false);
  const lastPressButton = useRef<string>("");

  const handleClick = (buttonName: string) => {
    if (buttonName === "AC") {
      setDisplayNumber(null);
      setAccumulator("0");
      setOperator(null);
      setIsNewNumber(true);
      setShowingResult(false);
      return;
    }

    if (
      lastPressButton.current != "" &&
      !isNumber(buttonName) &&
      !isDot(buttonName) &&
      buttonName !== "="
    ) {
      setOperator(buttonName);
      return;
    }

    lastPressButton.current = "";

    if (isNumber(buttonName) || isDot(buttonName)) {
      if (isNewNumber) {
        setAccumulator(displayNumber!);
      }
      setIsNewNumber(false);
      return setDisplayNumber((accumulator) => {
        return removeZeroLeft(
          isNewNumber ? buttonName : accumulator + buttonName
        );
      });
    }

    lastPressButton.current = buttonName;

    setIsNewNumber(true);

    if (buttonName !== "=") {
      setOperator(buttonName);
      setShowingResult(false);
    } else {
      setShowingResult(true);
    }

    if (!showingResult || buttonName !== "=") {
      setAccumulator(displayNumber!);
    }

    if (operator && (!showingResult || buttonName === "=")) {
      if (showingResult) {
        setDisplayNumber(calculate(operator, displayNumber!, accumulator));
      } else {
        setDisplayNumber(calculate(operator, accumulator, displayNumber!));
      }
    }
  };

  return (
    <div className="calculator">
      <Display
        value={
          displayNumber == "Infinity" || accumulator == "Infinity"
            ? "Não é possível dividir por zero"
            : displayNumber?.toString() || "0"
        }
      />
      <ButtonsPanel onClick={handleClick} />
    </div>
  );
}

export default App;
