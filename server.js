const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.post("/books/moveItem/:fromIndex/:toIndex", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 允许任何来源
  res.header("Access-Control-Allow-Methods", "POST"); // 允许POST请求
  res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许Content-Type头

  const fromIndex = req.params.fromIndex;
  const toIndex = req.params.toIndex;

  const db = router.db.getState();
  let books = [...db.books];

  const draggedItem = books.splice(fromIndex, 1)[0];

  books.splice(toIndex, 0, draggedItem);

  router.db.setState({ books });

  res.send(books);
});

server.use((req, res, next) => {
  if (req.path === "/moveItem/:fromIndex/:toIndex") {
    const fromIndex = parseInt(req.params.fromIndex);
    const toIndex = parseInt(req.params.toIndex);

    // 从数据库中获取数据
    const db = router.db.getState();
    const items = db.items;

    // 根据传入的索引更改元素位置
    if (
      fromIndex >= 0 &&
      fromIndex < items.length &&
      toIndex >= 0 &&
      toIndex < items.length
    ) {
      const [itemToMove] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, itemToMove);
    }

    // 更新数据库中的数据
    router.db.setState({ ...db, items });
  }

  next();
});

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
