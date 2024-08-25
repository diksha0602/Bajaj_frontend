import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jsonData, setJsonData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "21BAI1777";
  }, []);

  const handleInputChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData);
      const response = await axios.post("YOUR_BACKEND_URL/bfhl", parsedData);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or API error");
      setResponseData(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    let filteredData = {};
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.highestLowercaseAlphabet =
        responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Your College Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter JSON here"
          value={jsonData}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <div>
          <h3>Full Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      {responseData && (
        <div>
          <label htmlFor="options">Filter response by:</label>
          <select id="options" multiple onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
