import { useRef } from "react";
import BookShow from "./BookShow";
import useBooksContext from "../hooks/useContext";

const BookList = () => {
  const { books } = useBooksContext();

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const renderBooks = () =>
    books.map((book, index) => {
      return (
        <BookShow
          dragItem={dragItem}
          dragOverItem={dragOverItem}
          index={index}
          key={book.id}
          book={book}
        />
      );
    });

  return <div className="book-list"> {renderBooks()}</div>;
};

export default BookList;
