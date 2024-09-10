import React from 'react'
import "./index.css"
import { Register } from './components/Register.jsx'
import { Header } from './components/Header.jsx'


const App = () => {

  return (
    <div className='bg-slate-950'>
      <Header/>
      <Register/>
    </div>
  )
}

export default App