import React, { useState } from 'react';
import { search, getAll } from '../../Api/BooksAPI';
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
        const searchResult = await search(query.trim(), MAX_RESULTS).then((data) => data).catch((error)=>error);
        const mainPageResult = await getAll().then((data) => data);
        try {
            for (let mainPageBook of mainPageResult) {
                for (let searchResultBook of searchResult) {
                    if (searchResultBook.title === mainPageBook.title) {
                        searchResultBook.shelf = mainPageBook.shelf;
                    }
                }
            }
        }catch(error){

        }
        setBooks(searchResult);
    }

    return (
        <div>
            <div>
                <Link to="/"><center>Go to Home Page</center></Link>
            </div>
            <div className='search-input'>
                <input
                    type='text'
                    style={{
                        width: 200,
                        height: 20,
                    }}
                    placeholder="Search books"
                    value={searchQuery}
                    onChange={(e) => serachBook(e.target.value)}
                />
            </div>
            {books && books.length > 0 && <div className='search-result'>
                <ul className='book-list'>
                    {books.map((book, index, arr) =>
                        index <= arr.length / 2 && <li key={book.id}><Book book={book} /></li>
                    )
                    }
                </ul>
                <ul className='book-list'>
                    {books.map((book, index, arr) =>
                        index > arr.length / 2 && index < arr.length && <li key={book.id}><Book book={book} /></li>
                    )
                    }
                </ul>
            </div>}
        </div>
    )
}
