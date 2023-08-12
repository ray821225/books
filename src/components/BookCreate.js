import { useState } from "react";
const BookCreate = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="book-create">
      <h3>Add a book</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(title);
          setTitle("");
        }}
      >
        <label>title</label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button">create book</button>
      </form>
    </div>
  );
};

export default BookCreate;
