import React, { useState } from 'react';
import { search, getAll, get } from '../../Api/BooksAPI';
import Book from '../Book/Book';
import { Link } from 'react-router-dom';


export default function Search() {
    const MAX_RESULTS = 15
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);


    /**
     * @description "The function is called on every key type event of the input
     * serach box"
     * @param {string} query 
     */
    const serachBook = async (query) => {
        setSearchQuery(query);
        const searchResult = await search(query.trim(), MAX_RESULTS).then((data) => data).catch((error) => error);
        const mainPageResult = await getAll().then((data) => data);
        try {
            for (let mainPageBook of mainPageResult) {
                for (let searchResultBook of searchResult) {
                    if (searchResultBook.title === mainPageBook.title) {
                        searchResultBook.shelf = mainPageBook.shelf;
                    }
                }
            }
        } catch (error) {

        }
        setBooks(searchResult);
    }

    /**
   * @description "Updates the shelves as per user's selection"
   * @param {Object} book 
   * @param {string} shelftoMove 
   * @param {string} oldShelf 
   */
    const updateShelves = async (book, shelftoMove, oldShelf) => {
        if (oldShelf === "currentlyReading") {
            setCurrentlyReading(currentlyReading.filter((currBook) => book !== currBook))
        }
        if (oldShelf === "wantToRead") {
            setWantToRead(wantToRead.filter((currBook) => book !== currBook))
        }
        if (oldShelf === "read") {
            setRead(read.filter((currBook) => book !== currBook))
        }
        if (shelftoMove === "currentlyReading") {
            setCurrentlyReading([...currentlyReading, book]);
            
        }
        if (shelftoMove === "wantToRead") {
            setWantToRead([...wantToRead, book]);
            
        }
        if (shelftoMove === "read") {
            setRead([...read, book]);
            
        }
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
                        index <= arr.length / 2 && <li key={book.id}>
                            <Book
                                book={book}
                                updateShelf={updateShelves}
                            /></li>
                    )
                    }
                </ul>
                <ul className='book-list'>
                    {books.map((book, index, arr) =>
                        index > arr.length / 2 && index < arr.length && <li key={book.id}>
                            <Book
                                book={book}
                                updateShelf={updateShelves}
                            /></li>
                    )
                    }
                </ul>
            </div>}
        </div>
    )
}
