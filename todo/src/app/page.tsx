"use client"

import { FormEvent, useRef } from "react";
import TodoItem from "./components/TodoItem";
import {useSession} from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user);
  const ref = useRef(null);
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const text = ref.current && ref.current['value'];
    console.log(text); 
  }
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center pt-20">
      <div className="bg-white w-96 h-fit p-5 rounded-sm">
        <h1 className="font-bold text-2xl">Todo App</h1>

        <form action="" onSubmit={e=>handleSubmit(e)} className="flex items-center mt-3 space-x-1  mb-3">
          <input
            ref={ref}
            className="inline-block rounded-sm pl-2  border-2 w-5/6 border-gray-200 h-10 focus:outline-none "
            type="text"
            placeholder="Add your new todo"
            name="input"
          />
          <button
            type="submit"
            className="bg-violet-600 px-2 py-2 h-10 rounded-sm w-1/6 flex justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </form>

        <TodoItem key={'1'}/>
        <TodoItem key={'2'}/>
        <TodoItem key={'3'}/>
        <TodoItem key={'4'}/>
      </div>
    </div>
  );
}
