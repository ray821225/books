import { useState } from "react";

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book.id, title);
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
