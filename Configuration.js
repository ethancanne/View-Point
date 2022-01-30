// LOAD ENVIRONMENT VARIABLES.
require("dotenv").config();

/**
 * This class provides an interface for configuration settings set
 * through environment variables.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class Configuration {
  /**
   * Gets the database URI to use. The URI to use might differ depending
   * on if the application is in development or production, so there are
   * possibly two correct URIs depending on the context.
   * @return {String} The database URI to use.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getDatabaseUri() {
    const applicationIsInProduction = Configuration.isSetToProduction();
    let databaseUri = "";
    if (applicationIsInProduction) {
      databaseUri = this.getProductionDatabaseUri();
    } else {
      databaseUri = this.getDevelopmentDatabaseUri();
    }
    return databaseUri;
  }

  /**
   * Gets the development database URI.
   * @return {String} The development database URI.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getDevelopmentDatabaseUri() {
    return process.env.DEVELOPMENT_DATABASE_URI;
  }

  /**
   * Gets the node environment. This determines whether the application
   * is in production mode or development mode.
   * @return {String} The node environment.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getNodeEnvironment() {
    return process.env.NODE_ENV;
  }

  /**
   * Gets the name of the collection used to store posts.
   * @return {String} The name of the collection used to store posts.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getPostCollectionName() {
    return process.env.COLLECTION_FOR_POSTS;
  }

  /**
   * Gets the production database URI.
   * @return {String} The production database URI.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getProductionDatabaseUri() {
    return process.env.PRODUCTION_DATABASE_URI;
  }

  /**
   * Gets the private RSA key. This is used for authentiction token encryption.
   * @return {String} The private RSA key.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getPrivateRsaKey() {
    // The RSA key needs newline escape characters replaced with actual new lines.
    return process.env.RSA_PRIVATE_KEY.replace(/\\n/g, "\n");
  }

  /**
   * Gets the public RSA key. This is used for authentication token encryption.
   * @return {String} The public RSA key.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getPublicRsaKey() {
    // The RSA key needs newline escape characters replaced with actual new lines.
    return process.env.RSA_PUBLIC_KEY.replace(/\\n/g, "\n");
  }

  /**
   * Gets the server port to use.
   * @return {String} The server port.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getServerPort() {
    // The default port used in most applications is 5000. In the event that the application is being hosted on a remote server, the port assigned to the process running the application might be different, so that one should be used.
    const DEFAULT_PORT = 5000;
    return process.env.PORT || DEFAULT_PORT;
  }

  /**
   * Gets the filepath of the folder for the static resource build to serve.
   * @return {String} The filepath of the folder to serve the static resource build from.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getStaticResourceFolder() {
    return process.env.STATIC_RESOURCE_FOLDER;
  }

  /**
   * Gets the name of the collection used to store users.
   * @return {String} The name of the collection used to store users.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static getUserCollectionName() {
    return process.env.COLLECTION_FOR_USERS;
  }

  /**
   * Determines whether the application is in development or production mode.
   * @return {bool} True if the application is in production mode; false otherwise.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static isSetToProduction() {
    const productionStatusName = "production";
    let applicationIsInProduction =
      process.env.NODE_ENV === productionStatusName;
    return applicationIsInProduction;
  }
}

module.exports = Configuration;
