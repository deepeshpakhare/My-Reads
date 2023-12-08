import React from 'react';
import Book from '../Book/Book';
import PropTypes from "prop-types";


export default function Shelf({ books, shelfName, onShelfChange }) {
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
                            updateShelf = {onShelfChange}
                        />
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
}

Shelf.propTypes = {
    books : PropTypes.array,
    shelfName: PropTypes.string
}
