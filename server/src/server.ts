import app from "./app"

const port = 3333
app.listen(port, () => {
  console.log(`Listen in ${port}`)
  console.log(`CTRL + Click -> http://localhost/${port}`)
})
