"use client";

import { useState, ChangeEvent } from "react";

// Define the type for a Todo item
interface TodoItem {
  task: string;
  id: number;
}

export default function Home() {
  const [todo, setTodo] = useState<TodoItem[]>([
    { task: "Doing HomeWork", id: 1 },
    { task: "Reading Books", id: 2 },
  ]);

  const [inputVal, setInput] = useState<string>("");
  const [id, setId] = useState<number>(0);

  function addItem() {
    // Find the item by id
    const obj = todo.find((item) => item.id === id);

    if (obj) {
      // If the item exists, replace it
      const newArr = todo.filter((item) => item.id !== obj.id);
      setTodo([...newArr, { task: inputVal, id }]);
    } else {
      // If the item doesn't exist, add a new one
      setTodo([...todo, { task: inputVal, id }]);
    }

    // Clear the input and id
    setInput("");
    setId(0);
  }

  function editItem(id: number) {
    const obj = todo.find((item) => item.id === id);
    if (obj) {
      setInput(obj.task);
      setId(obj.id);
    }
  }

  function DelItem(id: number) {
    const newArr = todo.filter((item) => item.id !== id);
    setTodo([...newArr]);
  }

  // Handle changes for the input fields
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  return (
    <div className="main">
      <h1>Easy Life To-Do App</h1>

      {/* Input Field */}
      <div className="input-here">
        <input
          className="task-name"
          onChange={handleInputChange}
          value={inputVal}
          type="text"
          placeholder="Enter Your Task Here"
        />

        <input
          className="task-id"
          onChange={handleIdChange}
          value={id}
          type="number"
          placeholder="Write Id"
        />

        <button onClick={addItem} className="add-item">
          Add Task
        </button>
      </div>

      <h1 className="mt-5">Task Lists</h1>

      {/* Grid Columns */}
      <div className="grid">
        {todo.map((item, index) => (
          <div className="grid-data" key={index}>
            <div className="col1">
              <span className="x">{index + 1}</span>
              <span
                onClick={() => DelItem(item.id)}
                className="x cursor-pointer"
              >
                X
              </span>
            </div>

            <div className="col-data">
              <div>{item.task}</div>
              <h2
                onClick={() => editItem(item.id)}
                className="text-right text-lg cursor-pointer ml-auto w-10"
              >
                Edit
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
