// Todo.js
import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);

  if (!props.todo || !props.todo.id) {
    return null;
  }

  const handleDelete = async () => {
    try {
      console.log('Deleting document with ID:', props.todo.id);
      await deleteDoc(doc(db, 'todos', props.todo.id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const updateTodo = async () => {
    try {
      await updateDoc(doc(db, 'todos', props.todo.id), { todo: input });
      setOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-2 px-11" id="cont">
     
      <div className="list-item-text">
        <p className="text-lg text-green-100">{props.todo.todo}</p>
        <p className="text-muted">Duration 🕰️</p>
      </div>

      
      <div className="btn-group px-8">
       
        <button className="btn btn-success me-2 px-2" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>

        
        <button className="btn btn-danger px-2" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash}  />
        </button>
      </div>

    
      <div className={`modal ${open ? 'block' : 'hidden'}`}>
        <div className="modal-content justify-center align-baseline">
        
          <div className="modal-header pt-3">
            <label className="modal-title text-2xl">Edit Todo</label>
            <button type="button" className="btn-close" onClick={() => setOpen(false)}></button>
          </div>

        
          <div className="modal-body">
            <input
              className="form-control mb-4 custom-input m-5 rounded-md bg-emerald-400 p-2 "
              value={input}
              placeholder={props.todo.todo}
              onChange={(event) => setInput(event.target.value)}
              disabled={!open}
            />
          </div>
          <div className="modal-footer px-6 ">
            <button className="btn btn-primary " onClick={updateTodo} disabled={!open}>
              <FontAwesomeIcon icon={faCheck} size = '2x'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
