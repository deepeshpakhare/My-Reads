import React from 'react';
import Book from '../Book/Book';

export default function Shelf({ books, shelfName }) {
  return (
    <div>
        <div className='shelf-name'>
            {shelfName}
        </div>
        <div className='booklist-container'>
            <ul className='book-list'>
                {books.map((book) => 
                    <li key={book.id}>
                        <Book 
                            book = {book}
                        />
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
}




