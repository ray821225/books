import { useState, useRef } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/useContext";

const BookShow = ({ book, index, dragItem, dragOverItem }) => {
  const [showBookEdit, setShowBookEdit] = useState(false);

  const { delBook, books, setBooks, changeBookSort } = useBooksContext();

  const handleSubmit = () => {
    setShowBookEdit(false);
  };

  let content = <h3>{book.title}</h3>;

  if (showBookEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  const handleSort = () => {
    console.log("innn sort");

    changeBookSort(dragItem.current, dragOverItem.current);
    // let booksItem = [...books];

    // const draggedItem = booksItem.splice(dragItem.current, 1)[0];

    // booksItem.splice(dragOverItem.current, 0, draggedItem);

    // dragItem.current = null;
    // dragOverItem.current = null;

    // console.log(booksItem, "booksItem");

    // setBooks(booksItem);
  };

  return (
    <div
      className="book-show"
      draggable
      onDragStart={(e) => {
        dragItem.current = index;
      }}
      onDragEnter={(e) => {
        dragOverItem.current = index;
      }}
      onDragEnd={handleSort}
    >
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button
          className="edit"
          onClick={() => {
            setShowBookEdit(!showBookEdit);
          }}
        >
          Edit
        </button>
        <button
          className="delete"
          onClick={() => {
            delBook(book.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookShow;
