const Path = require("path");
const { dirname } = require("path");
const Configuration = require("../../Configuration.js");

/**
 * The router used to serve static resources.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
class StaticResourceRouter {
  /**
   * Initialize the router and serve the routes.
   * @param {Server} server The server instance used to provide the routes.
   * @param {Authenticator} authenticator The authenticator used to protect the routes.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  static serveRoutes(server, authenticator) {
    // This serves the default index file, used to display all other contents of the application.
    server.get("/*", StaticResourceRouter.getIndexFile);
  }

  // GET ROUTES.
  /**
   * This serves the index file.
   * @param  {object} request The request being served.
   * @param  {object} response The response being generated.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   * @static
   */
  static getIndexFile(req, res) {
    // SEND THE INDEX FILE.
    const staticResourceFolder = Configuration.getStaticResourceFolder();

    const indexFileFilepath = Path.join(
      Path.join(dirname(require.main.filename), "../"),
      "client",
      staticResourceFolder,
      "index.html"
    );
    res.sendFile(indexFileFilepath);
  }
}

module.exports = StaticResourceRouter;
