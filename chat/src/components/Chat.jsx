import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Message } from './Message';
import ScrollToBottom from "react-scroll-to-bottom"
import {userData} from "./Register.jsx"
import { Header } from './Header.jsx';

// const ENDPOINT = "http://localhost/5000";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = io("http://localhost:5000")

    console.log(userData)

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', {message, id, userData})
        document.getElementById('chatInput').value = ""
    }
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected")
            console.log(socket.id)
            setId(socket.id)

            
        })
        // console.log(socket.id)
        
        // we've mention same event name in both client as well as server side.
        // sending data from the client
        console.log(userData)
        socket.emit('joined', userData)
        socket.on('welcome',(data) => {
            setMessages([...messages, data])
            console.log(data);
            console.log(data.user, data.message);
            
        })
        socket.on('userJoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        })

        
        

        socket.on('leave', (data) => {
            console.log(data)
        })

        return () => {
            // socket.emit('disconnectt')
            socket.off()
        }
    },[])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log(data)
        })

        return () => {
            socket.off();
        }
    },[messages])

  return (
    <>
    <Header/>
    <div className='flex flex-col justify-center items-center bg-black'>
        <div></div>
        <div className='bg-slate-50'>
        <ScrollToBottom className=' h-[80vh] w-[70vw] rounded-md p-2'>
            {messages.map((item, i) => <Message key={i} user={item?.user} id={item?.userData} message={item?.message} classs = {item.id === id ? 'right':'left'}/>)}
        </ScrollToBottom>
        </div>
        <div className='bg-gray-500 p-6 flex w-[70vw] rounded-md'>
            <input className='border-zinc-950 w-[50vw] p-4 rounded-md text-black font-semibold text-[1.5rem]' type="text" id='chatInput' />
            <button className='text-3xl bg-red-500 text-white w-[15vw] p-3 rounded-md ml-2' onClick={() => send()} type="submit">send</button>
        </div>
    </div>
    </>
  )
}

export {Chat}