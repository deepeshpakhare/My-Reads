import React, { useEffect, useState } from 'react';
import './App.css';
import { getAll, get } from "./Api/BooksAPI.js"
import Shelf from './Components/Shelf/Shelf';
import { Link } from "react-router-dom";



function App() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  /**
   * @description allocates the books to appropriate shlelves based on the "shelf" property.
   * @param {array} bookData 
   */
  const distributeBooksShelfWise = (data) => {
    setCurrentlyReading(data.filter((book) =>
      book.shelf === "currentlyReading"));
    setWantToRead(data.filter((book) =>
      book.shelf === "wantToRead"));
    setRead(data.filter((book) =>
      book.shelf === "read"))
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
      book.shelf = "currentlyReading";
    }
    if (shelftoMove === "wantToRead") {
      setWantToRead([...wantToRead, book]);
      book.shelf = "wantToRead";
      
    }
    if (shelftoMove === "read") {
      setRead([...read, book]);
      book.shelf = "read";
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await getAll().then((data) => {
          distributeBooksShelfWise(data)
        });
        ;
      }
    })();
    return () => mounted = false;
  }, [])


  return (
    <div className="App">
      <div className='title'>
        My Reads
      </div>
      <div><Link to="/search"><center>Add New Books</center></Link></div>
      <div className='container'>
        <Shelf books={currentlyReading} shelfName={"Currently Reading"} onShelfChange={updateShelves} />
        <Shelf books={wantToRead} shelfName={"Want To Read"} onShelfChange={updateShelves} />
        <Shelf books={read} shelfName={"Read"} onShelfChange={updateShelves} />
      </div>
    </div >
  );

}

export default App;
