import { useState } from "react";

export default function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [textInput, setTextInput] = useState("");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleSubmit = () => {
    console.log("Selected Button:", selectedButton);
    console.log("Text Input:", textInput);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="flex space-x-4">
        {["Visual", "Auditory", "Read/ Write", "Kinesthetic"].map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn)}
            className={`px-4 py-2 border rounded-lg ${selectedButton === btn ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {btn}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Prefered Learning Media"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="p-2 border rounded-lg w-64"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}
