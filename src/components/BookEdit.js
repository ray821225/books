import { useState } from "react";
import useBooksContext from "../hooks/useContext";

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);

  const { editBook } = useBooksContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    editBook(book.id, title);
  };

  return (
    <form className="book-edit" onSubmit={handleSubmit}>
      <label>title</label>
      <input
        className="input"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button className="button is-primary">Save</button>
    </form>
  );
};

export default BookEdit;
