const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

//   app.use(express.static("public"));

app.use(cors());

app.get('/', (req, res)=>{
    res.send('API is running...')
})

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});
