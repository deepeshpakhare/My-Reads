import React, { useState } from 'react';
import { search } from '../../Api/BooksAPI';
import Book from '../Book/Book';
import { Link } from 'react-router-dom';



export default function Search() {
    const MAX_RESULTS = 15
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);


    /**
     * @description "The function is called on every key type event of the input
     * serach box"
     * @param {string} query 
     */
    const serachBook = async (query) => {
        setSearchQuery(query);
        const serachResult = await search(query, MAX_RESULTS);
        setBooks(serachResult);
    }

    return (
        <div>
            <div>
                <Link to="/"><center>Go to Home Page</center></Link>
            </div>
            <input
                type='text'
                style={{
                    width: 200,
                }}
                placeholder="Search books"
                value={searchQuery}
                onChange={(e) => serachBook(e.target.value)}
            />

            <div>
                <ul className='book-list'>
                    {books.map((book) =>
                        <li key={book.id}><Book book={book} /></li>
                    )
                    }
                </ul>
            </div>
        </div>
    )
}
