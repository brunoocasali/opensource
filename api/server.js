const path = require("path")
const jsonServer = require("json-server")
const bodyParser = require("body-parser")

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, "db.json"))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(bodyParser.text())
server.post("/subscribe", (req, res, next) => {
  const data = JSON.parse(req.body)
  const db = router.db
  const user = db
    .get("user")
    .cloneDeep()
    .value()

  user.result = {
    ...user.result,
    ...data,
  }

  db.get("user")
    .assign(user)
    .write()

  res.status(201).jsonp(db.get("user").value())
})

server.use(router)
server.listen(3000, () => {
  console.log("Demo api server is running...")
})
