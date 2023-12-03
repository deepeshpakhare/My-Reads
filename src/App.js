import { useEffect, useState } from 'react';
import './App.css';
import { getAll } from "./Api/BooksAPI.js"
import Shelf from './Components/Shelf/Shelf';

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
        console.log(bookData);
        distributeBooksShelfWise(bookData);
      }
    })();
    return () => mounted = false;
  }, [])


  return (
    <div className="App">
      <div className='container'>
        <Shelf books={currentlyReading}/>
        <Shelf books={wantToRead}/>
        <Shelf books={read}/>
      </div>
    </div>
  );
}

export default App;
