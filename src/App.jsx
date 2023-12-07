import React, { useState } from "react";
import data from "./resources/countryData.json";
import "./App.css";

const Dropdown = ({ value, onSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setIsDropdownVisible(false);
    } else {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div id="dropdown" style={{ display: isDropdownVisible ? "inline" : "none" }}>
      {data
        .filter((item) => {
          const searchTerm = value.toLowerCase();
          const fullName = item.name.toLowerCase();

          return (
            searchTerm &&
            fullName.startsWith(searchTerm) &&
            fullName !== searchTerm
          );
        })
        .slice(0, 10)
        .map((item) => (
          <div onClick={() => onSelect(item.name)} key={item.name}>
            {item.name}
          </div>
        ))}
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  return (
    <div className="App">
      <h1>Search</h1>

      <div>
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                document.getElementById("dropdown").style.display = "none";
              }
            }}
          />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <Dropdown value={value} onSelect={onSearch} />
      </div>
    </div>
  );
};

export default App;
