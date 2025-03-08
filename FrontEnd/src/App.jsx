import { useState } from 'react'
import './App.css'


function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

   
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5173/ocr/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error uploading file");
      }
      const data = await response.json();
      console.log("Server response:", data);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="mb-2"
        />
        <br />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;