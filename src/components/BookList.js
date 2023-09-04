import { useRef } from "react";
import BookShow from "./BookShow";
import useBooksContext from "../hooks/useContext";

const BookList = () => {
  const { books, setBooks } = useBooksContext();

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    console.log("innn sort");
    let booksItem = [...books];

    const draggedItem = booksItem.splice(dragItem.current, 1)[0];

    console.log(draggedItem, "draggedItem");
    console.log(dragItem.current, "dragItem.current");
    console.log(dragOverItem.current, "dragOverItem.current");

    booksItem.splice(dragOverItem.current, 0, draggedItem);

    dragItem.current = null;
    dragOverItem.current = null;

    console.log(booksItem, "booksItem");

    setBooks(booksItem);
  };

  // const onDragStart = (e, index) => {
  //   console.log(e, "e");
  //   console.log(index, "start");
  // };
  // const onDragEnter = (e) => {
  //   console.log("in enter");
  //   console.log(index);
  // };
  // const onDragEnd = (e, index) => {
  //   console.log(e, "e");
  //   console.log(index, "end");
  // };

  const renderBooks = () =>
    books.map((book, index) => {
      return (
        <BookShow
          // onDragStart={onDragStart}
          // onDragEnd={onDragEnd}
          index={index}
          key={book.id}
          book={book}
        />
      );
    });

  const renderBooks2 = () => {
    return books.map((book, index) => {
      return (
        <div
          className="book-show"
          draggable
          onDragStart={(e) => {
            dragItem.current = index;
          }}
          onDragEnter={() => {
            dragOverItem.current = index;
          }}
          onDragEnd={handleSort}
        >
          <img
            alt="books"
            src={`https://picsum.photos/seed/${book.id}/300/200`}
          />
          <div>{book.title}</div>
          <div className="actions">
            <button
              className="edit"
              // onClick={() => {
              //   setShowBookEdit(!showBookEdit);
              // }}
            >
              Edit
            </button>
            <button
              className="delete"
              // onClick={() => {
              //   delBook(book.id);
              // }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return <div className="book-list"> {renderBooks()}</div>;
  // return <div className="book-list"> {renderBooks2()}</div>;
};

export default BookList;
