import React from 'react'


export default function Book({ title, subtitle, thumbnail }) {
  return (
    <div className='book-container'>
      <div className='book'>
        {<img src={thumbnail} alt={thumbnail}/>}
      </div>
    </div>
  )
}
