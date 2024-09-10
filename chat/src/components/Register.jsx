import React, { useState } from 'react'
import { Link } from 'react-router-dom';

let userData;

const sendData = () => {
    userData = document.getElementById('userData').value;
    document.getElementById('userData').value = "";
}

const Register = () => {

    const [name, setName] = useState()
    console.log(name)

  return (
      <>
      <center className='bg-black mt-4 text-white font-bold text-[3rem]'>Welcome to the chat room</center>
    <div className='flex justify-center h-[80vh] bg-black'>
      <div className='flex flex-col justify-center'>
        <input onChange={(e) => setName(e.target.value)} type="text" id='userData' className='w-[30vw] h-[7vh] rounded-md text-[2rem] font-semibold pl-3'/>
        <Link to='/chat'><button className='text-black bg-white rounded-md font-bold text-[2rem] w-[10vw] h-[5vh] pb-2 mt-2' onClick={sendData}>Get In</button></Link>
    </div>
    </div>
      </>
  )
}

export {Register, userData}