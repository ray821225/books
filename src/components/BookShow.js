import { useState, useRef } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/useContext";

const BookShow = ({ book, index }) => {
  const [showBookEdit, setShowBookEdit] = useState(false);

  const { delBook, books, setBooks } = useBooksContext();

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSubmit = () => {
    setShowBookEdit(false);
  };

  let content = <h3>{book.title}</h3>;

  if (showBookEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  const handleSort = () => {
    console.log("innn sort");
    let booksItem = [...books];

    const draggedItem = booksItem.splice(dragItem.current, 1)[0];

    console.log(draggedItem, "draggedItem");
    console.log(dragItem.current, "dragItem.current");
    console.log(dragOverItem.current, "dragOverItem.current");

    booksItem.splice(dragOverItem.current, 0, draggedItem);

    // dragItem.current = null;
    // dragOverItem.current = null;

    console.log(booksItem, "booksItem");

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
