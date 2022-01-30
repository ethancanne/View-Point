/**
 * Defines the response messages the server can send.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const ResponseMessages = {
  User: {
    ErrorCreateAccount:
      "An error occurred while attempting to create an account.",
    IncorrectPassword: "The password provided is incorrect.",
    SuccessAccountCreated: "The account was created successfully.",
    SuccessfullyRetrievedLoggedInUser:
      "The logged in user was successfully retrieved.",
    SuccessLogin: "The login was successful.",
    SuccessUpdateAuthenticationToken:
      "The authentication token has been successfully updated.",
    UnverifiedUserWasFound: "The unverified user was found.",
    UserAlreadyExists: "A user with that email address already exists.",
    UserNotFound: "The user was not found.",
    UserInvalidUpdates: "The updates you provided are invalid",
    UserErrorUpdating: "The update failed",
    UserSuccessfullyUpdated: "The updates were successful.",
    UserPasswordSuccessfullyUpdated: "The password was successfully updated.",
    UserErrorDeleted: "The deletion of the user failed.",
    UserSuccessfullyDeleted: "The user was successfully deleted.",
    UserNotAuthenticated: "You are unauthorized.",
    UserErrorLogin: "There's been an error while attempting to login.",
  },
};
module.exports = ResponseMessages;
