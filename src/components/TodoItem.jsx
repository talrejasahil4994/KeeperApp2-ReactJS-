import React, { useState, useRef, useEffect } from "react";

function TodoItem({ todo, index, onToggle, onEdit, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  // Update editValue when todo.text changes
  useEffect(() => {
    setEditValue(todo.text);
  }, [todo.text]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== todo.text) {
      onEdit(todo.id, editValue.trim());
    } else {
      setEditValue(todo.text); // Reset if no changes
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    }
  };

  const handleInputBlur = (event) => {
    // Only save on blur if it's not a right-click or button click
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || (!relatedTarget.classList.contains('todo-btn'))) {
      handleSave();
    }
  };

  const handleContextMenu = (event) => {
    // Prevent right-click context menu during editing
    if (isEditing) {
      event.preventDefault();
    }
  };

  const handleDragStart = (event) => {
    if (isEditing) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", index);
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");

    const dragIndex = parseInt(event.dataTransfer.getData("text/plain"));
    const hoverIndex = index;

    if (dragIndex !== hoverIndex) {
      onMove(dragIndex, hoverIndex);
    }
  };

  const handleTextClick = (event) => {
    // Prevent editing if already editing or if it's a checkbox click
    if (isEditing || event.target.type === 'checkbox') {
      return;
    }
    // Double click to edit
    if (event.detail === 2) {
      handleEdit();
    }
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""} ${isEditing ? "editing" : ""}`}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onContextMenu={handleContextMenu}
    >
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo-text editing-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleInputBlur}
          onContextMenu={(e) => e.stopPropagation()}
        />
      ) : (
        <span 
          className="todo-text" 
          onClick={handleTextClick}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="todo-btn save-btn" 
              onClick={handleSave}
              title="Save changes (Enter)"
            >
              ✓
            </button>
            <button 
              className="todo-btn cancel-btn" 
              onClick={handleCancel}
              title="Cancel editing (Escape)"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button 
              className="todo-btn edit-btn" 
              onClick={handleEdit}
              title="Edit todo"
            >
              ✏️
            </button>
            <button 
              className="todo-btn delete-btn" 
              onClick={() => onDelete(todo.id)}
              title="Delete todo"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;