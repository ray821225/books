import BookShow from "./BookShow";
import useBooksContext from "../hooks/useContext";

const BookList = () => {
  const { books } = useBooksContext();
  const renderBooks = () =>
    books.map((book) => {
      return <BookShow key={book.id} book={book} />;
    });

  return <div className="book-list"> {renderBooks()}</div>;
};

export default BookList;
