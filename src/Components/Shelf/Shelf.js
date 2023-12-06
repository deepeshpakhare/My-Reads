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
                            /*title={book.title} 
                            subtitle={book.subt} 
                            thumbnail={book.imageLinks.thumbnail}
                            shelfName={book.shelf}*/
                        />
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
}




