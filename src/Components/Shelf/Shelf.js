import React from 'react';
import Book from '../Book/Book';

export default function Shelf({ books }) {
    const shelfName = books.map((book) => book.shelf)[0];
  return (
    <div>
        <div className='shelf-name'>
            {shelfName === "currentlyReading"? "Currently Reading" :shelfName === "wantToRead"? "Wan To Read": "Read"}
        </div>
        <div className='booklist-container'>
            <ul className='book-list'>
                {books.map((book) => 
                    <li key={book.id}>
                        <Book title={book.title} subtitle={book.subt} thumbnail={book.imageLinks.thumbnail}/>
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
}




