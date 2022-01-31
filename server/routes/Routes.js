/**
 * This defines the routes the server will serve.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Routes = {
  User: {
    CreateAccount: "/api/users",
    Login: "/api/users/login",
    UpdateAuthenticationToken: "/api/users/update",
    LoggedInUser: "/api/users/me",
    LoggedInUserPassword: "/api/users/me/password",
  },
  StaticResources: {
    Index: "/*",
  },
};
module.exports = Routes;
