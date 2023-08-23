import { useState } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/useContext";

const BookShow = ({ book }) => {
  const [showBookEdit, setShowBookEdit] = useState(false);

  const { delBook } = useBooksContext();

  const handleSubmit = () => {
    setShowBookEdit(false);
  };

  let content = <h3>{book.title}</h3>;

  if (showBookEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="book-show">
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
