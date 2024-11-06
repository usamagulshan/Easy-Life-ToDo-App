"use client";

import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([
    { task: "Doing HomeWork", id: 1 },
    { task: "Reading Books", id: 2 },
  ]);

  const [inputVal, setInput] = useState("");
  const [id, setId] = useState(0);

  function addItem() {
    let obj: any = todo.find((item) => item.id == id);
    if (obj) {
      let newArr = todo.filter((item) => item.id != obj.id);
      setTodo([...newArr, { task: inputVal, id: id }]);
      setInput("");
      setId(0);
      return;
    }

    setTodo([...todo, { task: inputVal, id: id }]);
    setInput("");
    setId(0);
  }

  function editItem(id: any) {
    let obj: any = todo.find((item) => item.id == id);
    setInput(obj.task);
    setId(obj.id);
  }

  function DelItem (id:any){
    let newArr = todo.filter((item) => item.id != id);
      setTodo([...newArr]);
  }

  return (
    <div className="main">
      <h1>Easy Life To-Do App</h1>

      {/* Input Field */}

      <div className="input-here">
        <input
          className="task-name"
          onChange={function (event) {
            setInput(event.target.value);
          }}
          value={inputVal}
          type="text"
          placeholder="Enter Your Task Here"
        />

        <input
          className="task-id"
          onChange={function (event: any) {
            setId(event.target.value);
          }}
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
        {todo.map(function (item, index) {
          return (
            <div className="grid-data" key={index}>
              <div className="col1">
                <span className="x">{index + 1}</span>
                <span onClick={function () {DelItem(item.id)}} className="x cursor-pointer">X</span>
              </div>

              <div className="col-data">
                <div>{item.task}</div>
                <h2
                  onClick={() => {
                    editItem(item.id);
                  }}
                  className="text-right text-lg cursor-pointer ml-auto w-10"
                >
                  Edit
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
