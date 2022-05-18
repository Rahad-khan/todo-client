import axios from "axios";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { toast } from "react-toastify";

const TodoCard = ({ todo, refetch }) => {
    const [isComplete, setIsComplete] = useState(false);
  const { title, description, _id, complete } = todo;

  const handleDelete = async (id) => {
    const isDelete = window.confirm("Are you sure want to delete?");
    if (isDelete) {
      const { data } = await axios.delete(`https://mytodo-server1274.herokuapp.com/todo/${id}`);
      if (data.deletedCount > 0) {
        toast.success("Successfully Deleted");
        refetch();
      }
    }
  };

  const handleComplete = async (id) => {
      setIsComplete(!isComplete);
      console.log(!isComplete);
      const { data } = await axios.put(`https://mytodo-server1274.herokuapp.com/todo/${id}`,{complete:!isComplete});
      if (data.acknowledged) {
          toast.success("Congratulation!!!");
          refetch();
      }
  };
  return (
    <div>
      <div className="card max-w-lg shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h1
              className={`text-2xl font-semibold ${
                complete && "line-through"
              }`}
            >
              {title}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => handleComplete(_id)}
                className="flex items-center justify-center btn btn-outline"
              >
                <span>Complete</span> <MdOutlineDoneOutline className="" />
              </button>
              <button onClick={() => handleDelete(_id)}>
                <AiFillDelete className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className={`${complete && "line-through"}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
