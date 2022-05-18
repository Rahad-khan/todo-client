import React, { useState } from "react";
import TodoCard from "./TodoCard";

const Todo = () => {
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        const todoTitle = e.target.title.value;
        const description = e.target.description.value;
        const todo = [
            {title:todoTitle, description}
        ]
        setTodos(todo)
        console.log(todo);
    }
    console.log(todos);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-cyan-600">Your ToDo</h1>

      <form onSubmit={handleAddTodo}>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            name="description"
            class="textarea textarea-bordered"
            placeholder="Bio"
          ></textarea>
        </div>
        <input className="btn btn-outline mt-2" type="submit" value="Add" />
      </form>
      <div className="grid md:grid-cols-3">
          {
              todos.map(todo => <TodoCard todo={todo}></TodoCard>)
          }
      </div>
    </div>
  );
};

export default Todo;
