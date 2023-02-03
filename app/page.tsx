"use client";
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

import React, { useState } from 'react'


export default function Home() {
  const [todo, setTodo] = useState([
    {text: 'Learn Javascript ES6 and above', completed: false},
    {text: 'Learn Typescript', completed: false},
    {text: 'Learn ReactJS and practice', completed: false},
    {text: 'Learn Nextjs and install on your local machine.', completed: true},
  ]);

  const [todoText, setTodoText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [message, setMessage] = useState('');

 
  const handleSave = () => {
      setMessage('');
      if(todoText == ""){
          setInputError(true);
      }else{
        setInputError(false);
        const newTodo = {text: todoText, completed: false};
        const newTodos = [...todo, newTodo];
        setMessage("Todo successfully created.");
        setTodo(newTodos);
        setTodoText("");
      }
  }
  const handleCompleted = (t: any) => {
      setInputError(false);
      const newTodo = todo.map((todo)=>{
        
          if(t.text == todo.text){
            console.log(t.text,  todo.text)
            todo.completed = !todo.completed
            
            todo.completed?
            setMessage('Todo successfuly completed.'):
            setMessage('Todo successfuly reset.');
          }
          
          return todo;
      });
  
      setTodo(newTodo);
  }

  const handleDelete = (t: any) =>{
      setInputError(false);
      const newTodo = todo.filter ((obj)=>{
        if(obj.text == t.text){
          return false;
        }
        return true;
      });
      
      setMessage('Todo successfuly deleted.')
      setTodo(newTodo);
  }

  return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Todo</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Manage todo list, users can see their current task status, mark unmark and can delete their tasks.</p>
          </div>


        <div className="w-full px-4 m-auto mb-5">
          
          <div className="flex flex-wrap justify-center items-end">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                { inputError && <p className='text-red-500'>Todo field is required.</p> }
                <label className="leading-7 text-sm text-gray-600">Add New Todo</label>
                <input type="text" onChange={(e)=>{ setTodoText( e.target.value )}} value={todoText} id="footer-field" name="footer-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              
              </div>
              <button onClick={()=>{handleSave()}} className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Save</button>
          </div>
        </div>


          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            
            { (message !== "") && <p className='text-green-500 p-5'>{message}</p> }
            
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="w-1 px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Mark/Unmark</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Todo</th>
                  <th className="w-1 px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Delete</th>
                </tr>
              </thead>
              <tbody>

                {todo.map((obj)=>{
                  return(
                      <tr key={obj.text}>
                        <td className="px-4 py-3">
                        <input type="checkbox" checked={obj.completed} onChange={()=>{ handleCompleted(obj) }} className=" indeterminate:bg-gray-300  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" /></td>
                        <td className={`px-4 py-3 ${obj.completed? 'line-through': null} `}>{obj.text}</td>
                        <td className="px-4 py-3"><button onClick={()=>{ handleDelete(obj)}} className="lg:mt-2  xl:mt-0 flex-shrink-0 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mr-0">Delete</button></td>
                      </tr>
                  )
                })}
                
               


              </tbody>
            </table>
          </div>
           
        </div>
      </section>
    )
}
