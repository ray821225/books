import { createContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
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

  const changeBookSort = async (startId, endId) => {
    console.log(startId, endId);
    const response = await axios.post(
      // `http://localhost:3001/books/${startId}`,
      `http://localhost:3001/books/moveItem/${startId}/${endId}`
    );

    console.log(response, "res");

    setBooks(response.data);
  };

  const valueToShare = {
    books,
    fetchBooks,
    createBook,
    editBook,
    delBook,
    setBooks,
    changeBookSort,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}
export { Provider };
export default BooksContext;
