import { app } from "./app";

app.listen({
  host: "0.0.0.0",
  port: 8080
}).then( () => {
  console.log("Server is running on port 8080");
})

app.use('/', (req, res) => {
  res.send("Hello World");
})