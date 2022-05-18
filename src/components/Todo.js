import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "./Loading";
import TodoCard from "./TodoCard";

const Todo = () => {
  const [user, loading] = useAuthState(auth);

  
  const { data, isLoading, refetch } = useQuery("todos", async () => {
    return await axios.get(`https://mytodo-server1274.herokuapp.com/todo?email=${user.email}`);
  });
  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  console.log(data.data);
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const email = user.email
    const todoTitle = e.target.title.value;
    const description = e.target.description.value;
    const todo = { title: todoTitle, description, complete:false, email };

    const { data } = await axios.post("https://mytodo-server1274.herokuapp.com/todo", todo);
    if (data?.insertedId) {
      toast.success("Your Note Added SuccessFully");
      refetch();
      e.target.reset();
    }

    console.log(todo);
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold text-cyan-600">My notes</h1>

      <form onSubmit={handleAddTodo}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered"
            placeholder="Your Notes"
          ></textarea>
        </div>
        <input className="btn btn-outline mt-2" type="submit" value="Add" />
      </form>
      <div className="grid md:grid-cols-3 gap-4">
        {data.data.map((todo) => (
          <TodoCard key={todo._id} refetch={refetch} todo={todo}></TodoCard>
        ))}
      </div>
    </div>
  );
};

export default Todo;
