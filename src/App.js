import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import "./index.css";
const App = () => {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    const updatedBook = [
      ...books,
      { id: Math.round(Math.random() * 9999), title },
    ];
    setBooks(updatedBook);
  };

  const editBook = (id, newtitle) => {
    const updatedBook = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newtitle };
      }
      return book;
    });

    setBooks(updatedBook);
  };

  const delBook = (id) => {
    const updatedBook = books.filter((book) => book.id !== id);
    setBooks(updatedBook);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} delBook={delBook} editBook={editBook} />
      <BookCreate onSubmit={createBook} />
    </div>
  );
};

export default App;
