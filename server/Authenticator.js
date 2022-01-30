const Bcrypt = require("bcryptjs");
const ExtractJsonWebToken = require("passport-jwt").ExtractJwt;
const JsonWebToken = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const Validator = require("./Validator");
const ResponseMessages = require("./responses/ResponseMessages");

const Configuration = require("../Configuration.js");
const User = require("./Models/User.js");

/**
 * Used to model the options a JSON web token-based authentication strategy can have.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class JsonWebTokenStrategyOptions {
  /**
   * Initializes a set of default JSON web token options.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  constructor() {
    this.jwtFromRequest = ExtractJsonWebToken.fromAuthHeaderAsBearerToken();
    this.secretOrKey = Configuration.getPublicRsaKey();
    this.algorithms = ["RS256"];
  }
}

/**
 * Used to protect routes and manage authentication tokens.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class Authenticator {
  /**
   * Handles creating the instance of the authentication tool.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  constructor(server, passport) {
    // STORE THE SERVER AND PASSPORT INSTANCE.
    this.server = server;
    this.passport = passport;

    // INITIALIZE PASSPORT.
    const jsonWebTokenStrategyOptions = new JsonWebTokenStrategyOptions();
    const jsonWebTokenStrategy = new JwtStrategy(
      jsonWebTokenStrategyOptions,
      Authenticator.verifyJsonWebToken
    );
    this.passport.use(jsonWebTokenStrategy);

    // BIND THE FUNCTIONS TO THIS OBJECT.
    // Since the methods may be called from multiple scopes where "this" is defined
    // to be something other than the class instance, certain methods need to be bound
    // to this instance of the class.
    this.protectRoute = this.protectRoute.bind(this);
  }

  /**
   * Creates a hash for a user's password.
   * @param {String} password The password to hash.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  static hashPassword(password) {
    const saltRounds = 10;
    const salt = Bcrypt.genSaltSync(saltRounds);
    const hash = Bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   * Generates an authentication token for a user.
   * @param {User} user The user to generate a token for.
   * @returns {JsonWebToken} The authentication token.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  static issueAuthenticationToken(user) {
    // GENERATE THE AUTHENTICATION TOKEN.
    const userId = user.getId();
    // The authentication token is valid for a week.
    const authenticationDurationInMilliseconds = 1000 * 60 * 60 * 24 * 7;
    const authenticationTokenPayload = {
      sub: userId,
      iat: Date.now(),
    };

    const privateRsaKey = Configuration.getPrivateRsaKey();
    const authenticationTokenBody = JsonWebToken.sign(
      authenticationTokenPayload,
      privateRsaKey,
      {
        expiresIn: authenticationDurationInMilliseconds,
        algorithm: "RS256",
      }
    );
    const authentication = {
      token: `Bearer ${authenticationTokenBody}`,
      expires: authenticationDurationInMilliseconds,
    };

    const authenticationToken = authentication.token;

    const authenticationTokenExpirationDate = new Date(
      Date.now() + authentication.expires
    ).toDateString();

    return { authenticationToken, authenticationTokenExpirationDate };
  }

  /**
   * Used to verify that a JSON web token is associated with a valid user.
   * @param {object} jsonWebTokenPayload The JSON web token payload to check.
   * @param {function} nextMiddlewareFunction The next function to execute after this one.
   * @async
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  static async verifyJsonWebToken(jsonWebTokenPayload, nextMiddlewareFunction) {
    try {
      // GET THE USER ASSOCIATED WITH THE REQUEST.
      const userIdToSearchFor = jsonWebTokenPayload.sub;
      const user = await User.getById(userIdToSearchFor);

      // CHECK TO SEE IF AN ERROR OCCURRED.
      const errorOccurred = user instanceof Error;
      let errors = null;
      if (errorOccurred) {
        // If an error occurred while getting the user, the error will be returned,
        // so instead of the returned value representing a user, it represents an error.
        errors = user;
      }

      // CHECK TO SEE IF THE USER EXISTS.
      let userExists = Validator.isDefined(user);
      if (userExists) {
        // If the user exists, then continue to the next routine, indicating that no errors have occurred and supplying the user account found.
        return nextMiddlewareFunction(null, user);
      } else {
        // If the user doesn't exist, then continue to the next routine indicating that
        // no errors have occured, but no user was found with the given ID.
        return nextMiddlewareFunction(errors, userExists);
      }
    } catch {
      console.log("Can not connect");
      nextMiddlewareFunction("ERROR", false);
    }
  }

  /**
   * Checks if the provided password is correct.
   * @param {String} password The password to check.
   * @param {User} user The user to check the password for.
   * @return {boolean} True if the password is correct, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  static verifyPassword(password, user) {
    // CHECK IF THE PASSWORD IS CORRECT.
    const passwordHash = user.getPasswordHash();
    const passwordIsCorrect = Bcrypt.compareSync(password, passwordHash);
    return passwordIsCorrect;
  }

  /**
   * Used to prevent unauthorized users from accessing a route.
   * @return {function} The middleware function to protect the route.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  protectRoute(req, res) {
    // USE THE PASSPORT LIBRARY TO PROTECT THE ROUTE.
    const isAuthenticated = this.passport.authenticate("jwt", {
      session: false,
    });
    return isAuthenticated;
  }
}

module.exports = Authenticator;
