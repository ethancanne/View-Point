const BodyParser = require("body-parser");
const Express = require("express");
const Helmet = require("helmet");
const Mongoose = require("mongoose");
const Passport = require("passport");
const Authenticator = require("./Authenticator.js");
const Configuration = require("../Configuration.js");
const Path = require("path");
const { dirname } = require("path");

console.log("In Server");
//Bring in routers
const UserRouter = require("./routers/UserRouter");
const StaticResourceRouter = require("./routers/StaticResourceRouter");

// SETUP EXPRESS.
// Express is used to implement middleware.
const server = Express();
const staticResourceFolder = Configuration.getStaticResourceFolder();
const staticResourceFilepath = Path.join(
  Path.join(dirname(require.main.filename), "../"),
  "client",
  staticResourceFolder
);
server.use(Express.static(staticResourceFilepath));
server.use(BodyParser.urlencoded({ limit: "200mb", extended: false }));
server.use(BodyParser.json({ limit: "200mb" }));
server.use(Express.static("public"));

// SETUP DATABASE CONNECTION.
const databaseUri = Configuration.getDatabaseUri();

try {
  Mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connection to database established.");
} catch (error) {
  // Handle an error that occurs while establishing database connection.
  console.log("An error occurred while connecting to the database.", error);
}

// Handle an error that occurs after the database connection has been established.
Mongoose.connection.on("error", error => {
  console.log("An error occurred while connecting to the database.", error);
});

// SETUP AUTHENTICATION.
// The authenticator object is used to protect routes
// and manage authentication tokens.
server.use(Passport.initialize());
const authenticator = new Authenticator(server, Passport);

// ADD SECURITY MIDDLEWARE.
// Helmet is used to help with basic security.
server.use(Helmet());

// IMPLEMENT THE SERVER ROUTES.
UserRouter.serveRoutes(server, authenticator);
StaticResourceRouter.serveRoutes(server, authenticator);

// START SERVER.
const serverPort = Configuration.getServerPort();
server.listen(serverPort, () => {
  console.log(
    `Server deployed on port ${serverPort} in mode: ${Configuration.getNodeEnvironment()}.`
  );
});
