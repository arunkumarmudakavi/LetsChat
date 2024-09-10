import React from 'react'

const Message = ({message, classs, id, user}) => {
  // console.log(user)
  return (
    <div className={`${classs} messageBox text-3xl max-w-full break-words font-semibold mt-4`}>{id === undefined ? user : id}: {message}</div>
  )
}

export {Message}