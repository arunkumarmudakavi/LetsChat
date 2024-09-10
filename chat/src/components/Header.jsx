import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header>
        <nav className="bg-slate-900 p-8">
          <div className="text-4xl italic font-extrabold">
            <Link to="/" className='text-white'>Let'sChat</Link>
          </div>
        </nav>
        </header>
    </>
  )
}

export {Header}