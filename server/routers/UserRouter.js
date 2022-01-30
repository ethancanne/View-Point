const Path = require("path");
const Authenticator = require("../Authenticator");
const Configuration = require("../../Configuration.js");
const User = require("../Models/User.js");
const Validator = require("../Validator");
const ResponseMessages = require("../responses/ResponseMessages");

/**
 * The router used to serve account-related requests.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class UserRouter {
  /**
   * Initialize the router and serve the routes.
   * @param {Server} server The server instance used to provide the routes.
   * @param {Authenticator} authenticator The authenticator used to protect the routes.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  static serveRoutes(server, authenticator) {
    // This is used to check if an authentication token is valid. If it is valid, a new token is generated so that the user can have persistent logins.
    server.get(
      "/users/update",
      authenticator.protectRoute(),
      UserRouter.updateAuthenticationToken
    );

    //This is used to get the currently logged in user
    server.get(
      "/users/me",
      authenticator.protectRoute(),
      UserRouter.getLoggedInUser
    );

    //POST
    // This is used to create accounts.
    server.post("/users", UserRouter.createAccount);
    // This is used to log users in.
    server.post("/users/login", UserRouter.login);

    //PATCH
    // This is used to update the user's information
    server.patch(
      "/users/me",
      authenticator.protectRoute(),
      UserRouter.updateInfo
    );

    server.patch(
      "/users/me/password",
      authenticator.protectRoute(),
      UserRouter.updatePassword
    );

    //DELETE
    // This is used to delete the user's account
    server.delete(
      "/users/me",
      authenticator.protectRoute(),
      UserRouter.deleteAccount
    );
  }

  // GET ROUTES.
  /**
   * This updates a user's authentication token. This is done
   * for the purpose of persistent logins.
   * @param  {object} request The request being served.
   * @param  {object} response The response being generated.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static updateAuthenticationToken(req, res) {
    // GET THE AUTHENTICATION TOKEN.
    const { authenticationToken, authenticationTokenExpirationDate } =
      Authenticator.issueAuthenticationToken(req.user);

    // SEND THE RESPONSE.
    const responseMessage = {
      message: ResponseMessages.User.AuthenticationTokenWasUpdated,
      authenticationToken: authenticationToken,
      authenticationTokenExpirationDate,
      user: req.user.removeSensitiveAttributes(),
    };
    res.send(responseMessage);
  }

  /**
   * This return the currently logged in user.
   * @param  {object} request.user The logged in user
   * @param  {object} response The response being generated.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static async getLoggedInUser(req, res) {
    const responseMessage = {
      message: ResponseMessages.User.SuccessfullyRetrievedLoggedInUser,
      user: req.user.removeSensitiveAttributes(),
    };
    res.send(responseMessage);
  }

  // POST ROUTES.
  /**
   * Creates an user.
   * @param {String} request.body.email The email address of the user to be created.
   * @param {String} request.body.password The password of the user to be created.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async createAccount(req, res) {
    try {
      // CHECK FOR AN EXISTING ACCOUNT.
      const existingUser = await User.getByEmail(req.body.email);
      const userAlreadyExists = Validator.isDefined(existingUser);
      if (userAlreadyExists) {
        return res.json({
          message: ResponseMessages.User.UserAlreadyExists,
        });
      }

      //Create the user
      const user = await User.create(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        Authenticator.hashPassword(req.body.password),
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zipCode
      );

      const { authenticationToken, authenticationTokenExpirationDate } =
        Authenticator.issueAuthenticationToken(user);

      // SEND THE RESPONSE.
      user.removeSensitiveAttributes();
      return res.send({
        authenticationToken: authenticationToken,
        authenticationTokenExpirationDate: authenticationTokenExpirationDate,
        message: ResponseMessages.User.SuccessCreateUser,
        user: user,
      });
    } catch (e) {
      return res.status(500).send({
        message: ResponseMessages.User.ErrorCreateAccount,
        desc: e,
      });
    }
  }

  /**
   * This allows the user to log in.
   * @param {String} request.body.email The email address of the user.
   * @param {String} request.body.password The password of the user.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async login(req, res) {
    try {
      // GET THE USER ASSOCIATED WITH THE EMAIL ADDRESS ENTERED.
      const user = await User.getByEmail(req.body.email);

      // CHECK IF A USER WITH THE EMAIL ADDRESS EXISTS.
      const userWasNotFound = Validator.isUndefined(user);
      if (userWasNotFound || user.isActive === false) {
        return res
          .status(400)
          .send({ error: ResponseMessages.User.UserNotFound });
      }

      // CHECK IF THE PASSWORD IS CORRECT.
      const passwordIsCorrect = Authenticator.verifyPassword(
        req.body.password,
        user
      );

      if (passwordIsCorrect) {
        // IF THE PASSWORD IS CORRECT, THE USER SHOULD BE LOGGED IN.
        // Since logging the user in requires supplying their account to the client,the account object has to have any sensitive attributes removed before it gets sent.

        const { authenticationToken, authenticationTokenExpirationDate } =
          Authenticator.issueAuthenticationToken(user);

        user.removeSensitiveAttributes();

        return res.send({
          authenticationToken: authenticationToken,
          authenticationTokenExpirationDate: authenticationTokenExpirationDate,
          message: ResponseMessages.User.SuccessLogin,
          user: user,
        });
      } else {
        // IF THE PASSWORD IS INCORRECT, THE LOGIN ATTEMPT SHOULD FAIL.
        return res.status(400).send({
          message: ResponseMessages.User.IncorrectPassword,
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: ResponseMessages.User.UserErrorLogin,
        desc: e,
      });
    }
  }

  //PATCH ROUTES
  /**
   * This allows the user to change their information pertaining to their account
   * @param {String} request.body.firstName The firstName of the user (optional)
   * @param {String} request.body.lastName The lastName of the user (optional)
   * @param {String} request.body.address The address of the user (optional)
   * @param {String} request.body.city The city of the user (optional)
   * @param {String} request.body.state The state of the user (optional)
   * @param {String} request.body.zipCode The zipCode of the user (optional)
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async updateInfo(req, res) {
    const updates = Object.keys(req.body);
    const vaildUpdates = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zipCode",
      "email",
    ];
    const isVaildUpdates = updates.every(update =>
      vaildUpdates.includes(update)
    );

    if (!isVaildUpdates) {
      return res
        .status(400)
        .send({ error: ResponseMessages.User.UserInvalidUpdates });
    }
    updates.forEach(update => {
      switch (update) {
        case "firstName":
          req.user.setFirstName(req.body[update]);
          break;
        case "lastName":
          req.user.setLastName(req.body[update]);
          break;
        case "address":
          req.user.setAddress(req.body[update]);
          break;
        case "city":
          req.user.setCity(req.body[update]);
          break;
        case "state":
          req.user.setState(req.body[update]);
          break;
        case "zipCode":
          req.user.setZipCode(req.body[update]);
          break;
      }
    });
    try {
      const userWasSaved = await req.user.save();

      if (!userWasSaved)
        return res.send({
          error: ResponseMessages.User.UserErrorUpdating,
        });

      return res.send({
        message: ResponseMessages.User.UserSuccessfullyUpdated,
        user: req.user,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ error: ResponseMessages.User.UserErrorUpdating, desc: e });
    }
  }

  /**
   * This allows the user to change their password associated to their account
   * @param {String} request.body.currentPassword The current password of the user.
   * @param {String} request.body.newPassword The new password of the user.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async updatePassword(req, res) {
    //CHECK IF THE CURRENT PASSWORD PROVIDED IS CORRECT
    const currentPasswordIsCorrect = Authenticator.verifyPassword(
      req.body.currentPassword,
      req.user
    );

    if (!currentPasswordIsCorrect) {
      return res
        .status(400)
        .send({ error: ResponseMessages.User.IncorrectPassword });
    }

    req.user.setPassword(Authenticator.hashPassword(req.body.newPassword));

    try {
      const userWasSaved = await req.user.save();

      if (!userWasSaved) {
        return res
          .status(400)
          .send({ error: ResponseMessages.UserErrorUpdating });
      }

      res.send({
        message: ResponseMessages.User.UserPasswordSuccessfullyUpdated,
        user: req.user,
      });
    } catch (e) {
      res
        .status(400)
        .send({ error: ResponseMessages.UserErrorUpdating, desc: e });
    }
  }

  //DELETE ROUTES
  /**
   * This allows the user to delete their account
   * @param {String} request.body.currentPassword The current password of the user.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async deleteAccount(req, res) {
    //CHECK IF THE CURRENT PASSWORD PROVIDED IS CORRECT
    const currentPasswordIsCorrect = Authenticator.verifyPassword(
      req.body.currentPassword,
      req.user
    );

    if (!currentPasswordIsCorrect) {
      return res
        .status(400)
        .send({ error: ResponseMessages.User.IncorrectPassword });
    }

    try {
      const userWasDeleted = await req.user.delete();

      if (!userWasDeleted) {
        return res.send({
          message: ResponseMessages.User.UserErrorDeleted,
          user: req.user,
        });
      }

      return res.send({
        message: ResponseMessages.User.UserSuccessfullyDeleted,
        user: req.user,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ error: ResponseMessages.User.UserErrorDeleted, desc: e });
    }
  }
}

module.exports = UserRouter;
