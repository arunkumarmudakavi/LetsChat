import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Chat } from './components/Chat.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<App/>}/>
      <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
