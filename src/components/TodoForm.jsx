import React, { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleChange}
          value={inputValue}
          placeholder="What needs to be done?"
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default TodoForm;