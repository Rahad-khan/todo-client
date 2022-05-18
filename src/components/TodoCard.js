import React from 'react';
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

const TodoCard = ({todo}) => {
    const {title, description, _id} = todo;
    return (
      <div>
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <div className="flex justify-between items-center">
              <h1>{title}</h1>
              <div className="flex">
                <button>
                  <AiTwotoneEdit />
                </button>
                <button>
                  <AiFillDelete />
                </button>
              </div>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
};

export default TodoCard;