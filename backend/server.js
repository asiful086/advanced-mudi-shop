const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");

const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

// const typeDefs = require("./graphql/typeDefs");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// ======================== MIDDLEWARE  ===============

const app = express();
server.applyMiddleware({ app });

// app.use(express.static("../public"));
// console.log(path.join(__dirname, `../public/`))
app.use(express.static(path.join(__dirname, `../public/`)));
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// for production
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

// app.listen({ port: 4000 }, () => {
//   console.log(`🚀 Server ready at http://localhost:4000`);
// });

app.listen(
  PORT,
  console.log(
    `🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
