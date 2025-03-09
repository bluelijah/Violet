import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [textInput, setTextInput] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    // make the button stay selected?
    navigate('/dashboard')
  };

  const handleSubmit = async () => {
    // console.log("Selected Button:", selectedButton);
    // console.log("Text Input:", textInput);
    const userText = `Learning Style: ${selectedButton}, User Preferences: ${textInput}`;
      
    try {
      const response = await fetch("http://localhost:8000/capture_user_input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_text: userText })
      });
      const data = await response.json();
      console.log("Server response:", data);
      navigate('/dashboard')
    } catch (error) {
      console.error("Error:", error);
    }
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
