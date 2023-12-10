import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Todo from './Todo';
import { addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { todosCollection, auth } from './firebase';
import firebase from 'firebase/compat/app';
import Logout from './Logout';
import logo1 from "./assets/logo1.png";
import headerGif from "./assets/img.gif";
import './Front.css'

const Front = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const userId = auth.currentUser?.uid || '';

    // Redirect to login if not authenticated
    if (!auth.currentUser) {
      navigate('/');
    }

    const unsubscribe = onSnapshot(
      query(
        todosCollection,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }));
        setTodos(todosData);
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      await addDoc(todosCollection, {
        todo: input,
        userId: auth.currentUser?.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="bg-gif-container  " style={{ backgroundImage: `url(${headerGif})`, backgroundSize: 'cover' }}>
      
      <div className='flex items-center justify-between p-3 bg-black text-white opacity-80 '>
        <div className="flex items-center p-2">
          <img id="logo" src={logo1} alt="Mountain Icon" className=" h-20" />
        </div>
        <div className="flex items-center space-x-4 mx-4">
          <span>{auth.currentUser?.email}</span>
          <Logout />
        </div>
      </div>

      <div className='bg-gray-900 bg-opacity-40 '>
       
        <div id="cnt1" className="container mx-auto p-4 items-center w-full">
          <div className="mb-4 m-7">
            <h1 className="text-center text-3xl font-bold text-green-100">Hello Programmer 🚀!</h1>
            <h1 className="m-3 text-center text-s text-white">✍🏼 What u wanna add....</h1>
          </div>

          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder=''
              className="border border-green-300 bg-opacity-5 text-green-200 rounded-md p-2 h-10 w-96 bg-zinc-400"
              id="todo-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <div className="input-group-append m-3">
              <button
                className="btn bg-green-700 text-white h-10 rounded-md px-5 text-center justify-center "
                disabled={!input}
                onClick={addTodo}
              >
                Add TODO
              </button>
            </div>
          </div>
        </div>
        {/* <div id="cnt2" className="container mx-auto mt-32  max-h-96 px-20 p-4 rounded-md  overflow-y-auto">
          <ul className="list-group px-12">
            {todos.map((todo) => (
              <li key={todo.id} className="list-group-item bg-gray-800 bg-opacity-5 backdrop-blur-sm mb-5 border rounded-md p-4 text-green">
                <Todo todo={todo} />
              </li>
            ))}
          </ul>
        </div> */}
        <div
  id="cnt2"
  className="container mx-auto mt-32 max-h-96 px-20 p-4 rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-green-500"
>
  <ul className="list-group px-12 mx-16">
    {todos.map((todo) => (
      <li
        key={todo.id}
        className="list-group-item bg-gray-800 bg-opacity-5 backdrop-blur-sm mb-5 border rounded-md p-4 text-green"
      >
        <Todo todo={todo} isModalOpen={open} />
      </li>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
};

export default Front;
