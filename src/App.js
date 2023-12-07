import React, { useEffect, useState } from 'react';
import './App.css';
import { getAll } from "./Api/BooksAPI.js"
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
  const distributeBooksShelfWise = (bookData) => {
    setCurrentlyReading(bookData.filter((book) =>
      book.shelf === "currentlyReading"));
    setWantToRead(bookData.filter((book) =>
      book.shelf === "wantToRead"));
    setRead(bookData.filter((book) =>
      book.shelf === "read"));
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        const bookData = await getAll().then((data) => data);
        distributeBooksShelfWise(bookData);
        console.log(bookData)
      }
    })();
    return () => mounted = false;
  }, [currentlyReading, wantToRead, read])


  return (
      <div className="App">
        <div className='title'>
          My Reads
        </div>
        <div><Link to="/search"><center>Add New Books</center></Link></div>
        <div className='container'>
          <Shelf books={currentlyReading} shelfName={"Currently Reading"} />
          <Shelf books={wantToRead} shelfName={"Want To Read"} />
          <Shelf books={read} shelfName={"Read"} />
        </div>
      </div >
  );

}

export default App;
