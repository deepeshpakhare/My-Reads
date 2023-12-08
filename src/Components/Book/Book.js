import React, { useEffect, useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import { Dropdown } from 'antd'
import { update } from '../../Api/BooksAPI';
import PropTypes from 'prop-types'

export default function Book({ book, updateShelf }) {
  const [shelf,setShelf] = useState("");

  const items = [
    {
      key: '1',
      label: (<div style={{ fontWeight: "600", fontSize: "larger" }}>Move to....</div>),
      disabled: true
    },
    {
      key: '2',
      label: "Currently Reading",
      disabled: shelf === "currentlyReading" ? true :false,
    },
    {
      key: '3',
      label: "Want To Read",
      disabled: shelf === "wantToRead" ? true :false,
    },
    {
      key: '4',
      label: "Read",
      disabled: shelf === "read" ? true :false
    },
  ];

  const shelfNames = [
    {
      key: "2",
      shelfName: "currentlyReading"
    },
    {
      key: "3",
      shelfName: "wantToRead"
    },
    {
      key: "4",
      shelfName: "read"
    }
  ]

  /**
   * @description "Handles click event of menu items to move books to selected shelf"
   * @param {key} param0 
   */
  const onClick = async ({ key }) => {
    const shelfNameToMove = shelfNames.filter((obj) => obj.key === key)[0].shelfName;
    await update(book, shelfNameToMove).then(()=>{updateShelf(book,shelfNameToMove,shelf)});
    setShelf(shelfNameToMove);
  }


useEffect(()=> {
  setShelf(book.shelf);
},[])

  return (
    <div className='book-container'>
      <div className='book'>
        {book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.imageLinks.thumbnail} width="150" height="200" />}
        <Dropdown menu={{ items, onClick }} >
          <button className='caret'><FaCaretDown color='white' size={20} /></button>
        </Dropdown>
        </div>
        <div className='book-title'>
          {book.title}
          <div className='authors'>
            {book.authors && book.authors.map((author) => author)}
          </div>
        </div>
    </div>
  )
}

Book.propTypes = {
  book : PropTypes.object
}