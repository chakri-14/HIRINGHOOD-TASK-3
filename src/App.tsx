import { useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    if (value === "C") setInput("");
    else if (value === "⌫") setInput(input.slice(0, -1));
    else if (value === "=") {
      try {
        if (input.includes("/0")) throw new Error("Cannot divide by zero!");
        setInput(eval(input).toString());
      } catch {
        alert("Invalid Input");
        setInput("");
      }
    } else if (value === "√") {
      try {
        const num = parseFloat(input);
        if (num < 0) throw new Error("Cannot calculate square root of negative numbers!");
        setInput(Math.sqrt(num).toString());
      } catch {
        alert("Invalid Input");
        setInput("");
      }
    } else setInput((prev) => prev + value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Enter") handleClick("=");
    else if (key === "Backspace") handleClick("⌫");
    else if (!isNaN(Number(key)) || ["+", "-", "*", "/", "%", "."].includes(key)) {
      setInput((prev) => prev + key);
    }
  };

  return (
    <div style={{ width: 220, margin: "50px auto", textAlign: "center" }}>
      <input
        value={input}
        readOnly
        style={{ width: "100%", fontSize: "1.5rem", textAlign: "right" }}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button onClick={() => handleClick("C")}>C</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button onClick={() => handleClick("√")}>√</button>
        <button onClick={() => handleClick("⌫")}>⌫</button>
      </div>
    </div>
  );
};

export default App;
