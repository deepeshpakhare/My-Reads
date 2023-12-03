import React from 'react';
import Book from '../Book/Book';

export default function Shelf({ books }) {
  return (
    <div>
        <div className='shelf-name'>
            {books.shelf}
        </div>
        <div className='book-list'>
            <ul>
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




