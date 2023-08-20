import { useEffect, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import "./index.css";
import axios from "axios";
const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    const updatedBook = [...books, response.data];
    setBooks(updatedBook);
  };

  const editBook = async (id, newtitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newtitle,
    });

    const updatedBook = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });

    setBooks(updatedBook);
  };

  const delBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`, {
      id,
    });
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
