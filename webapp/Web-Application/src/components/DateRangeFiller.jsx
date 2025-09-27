import { useState } from "react";

export default function DateRangeFilter({ onApply, onReset }) {
  const [lowDate, setLowDate] = useState("");
  const [highDate, setHighDate] = useState("");

  const handleApply = () => {
    if (lowDate && highDate) {
      onApply(lowDate, highDate);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <div className="date-filter">
      <label>
        From:{" "}
        <input
          type="date"
          value={lowDate}
          onChange={(e) => setLowDate(e.target.value)}
        />
      </label>
      <label>
        To:{" "}
        <input
          type="date"
          value={highDate}
          onChange={(e) => setHighDate(e.target.value)}
        />
      </label>
      <button onClick={handleApply}>Apply</button>
      <button
        onClick={() => {
          setLowDate("");
          setHighDate("");
          onReset();
        }}
      >
        Reset
      </button>
    </div>
  );
}
