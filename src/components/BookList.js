import { useContext } from "react";
import BookShow from "./BookShow";
import BooksContext from "../context/books";

const BookList = ({ books, delBook, editBook }) => {
  const renderBooks = () =>
    books.map((book) => {
      return (
        <BookShow
          delBook={delBook}
          editBook={editBook}
          key={book.id}
          book={book}
        />
      );
    });

  return <div className="book-list"> {renderBooks()}</div>;
};

export default BookList;
