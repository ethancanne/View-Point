const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Configuration = require("../../Configuration.js");

const Validator = require("../Validator.js");
const validator = require("validator");

/**
 * Used to define the database schema for storing users.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
const UserSchema = new Mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "You must provide your first name."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "You must provide your last name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "You must provide your email address."],
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },

    passwordHash: {
      type: String,
      required: [true, "You must provide a password"],
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toObject", {
  versionKey: false,
  transform: (document, object) => {
    delete object.__v;
    return object;
  },
});

const userCollectionName = Configuration.getUserCollectionName();

const UserModel = Mongoose.model(userCollectionName, UserSchema);

/**
 * Provides an interface for working with users in the database.
 * @property {String} areaCode The user's area code.
 * @property {Mongoose.Schema.Types.ObjectId[]} conversations The user's conversations/chats. This is stored as a list of
 *   MongoDB document IDs so that the conversations can be accessed directly from the user.
 * @property {String} email The user's email address.
 * @property {String} name The user's name.
 * @property {String} passwordHash The user's hashed password.
 * @property {Buffer} profilePicture The user's profile picture. This must be less than 16MB.
 * @property {Mongoose.Schema.Types.ObjectId[]} studyGroups The study groups the user is a part of. This is stored as a list
 *   of MongoDB document IDs so that the study groups can be accessed directly from the user.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class User {
  /**
   * Initializes the user to the account passed in from the database.
   * @param  {Mongoose.Schema} userSchema The database record for a given user.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  constructor(userSchema) {
    // COPY THE DATABASE INSTANCE TO THE MODEL INSTANCE.
    // In order to maximize the usability of this class, the attributes stored in the database
    // record are copied to the instance of this class so they can be properly editied.
    // The user schema is converted to a regular object to sanitize it of wrapper methods and properties.
    Object.assign(this, userSchema.toObject());
  }

  /**
   * Creates a user.
   * @param {UnverifiedUser} unverifiedUser The unverified user to create from.
   * @param {String} areaCode The user's area code.
   * @param {String} name The user's name.
   * @param {Buffer=} profilePicture The user's profile picture.
   * @return {User} The created user.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async create(
    firstName,
    lastName,
    email,
    passwordHash,
    address,
    city,
    state,
    zipCode
  ) {
    try {
      // CREATE THE USER IN THE DATABASE.
      const userModel = new UserModel({
        firstName,
        lastName,
        email,
        passwordHash,
        address,
        city,
        state,
        zipCode,
      });
      await userModel.save();
      // RETURN THE CREATED INSTANCE.
      const user = new User(userModel);
      return user;
    } catch (error) {
      console.log("An error occurred while attempting to create a user.");
      return undefined;
    }
  }

  /**
   * Deletes a user.
   * @return {Boolean} True if the user was deleted, false otherwise.
   *
   * @async
   */
  async delete() {}

  /**
   * Gets the user's area code.
   * @return {String} The user's area code.
   */
  getZipCode() {
    return String(this.zipCode);
  }

  /**
   * Gets the user record from the database using the document ID.
   * @param  {String} userId The user ID to search for.
   * @return {User} The user instance, if found; otherwise undefined.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async getById(userId) {
    // CONVERT THE USER ID TO THE ACCEPTABLE TYPE.
    const convertedUserId = Mongoose.Types.ObjectId(userId);

    // GET THE USER BASED ON THE GIVEN ID.
    let userRecord = false;
    try {
      userRecord = await UserModel.findOne({ _id: convertedUserId }).exec();
    } catch (error) {
      console.log("An error occurred while attempting to get a user by ID.");
      // If an error occurs, it should be returned.
      return error;
    } finally {
      // If the user wasn't able to be found in the database, this routine should return undefined.
      let user = undefined;
      let userWasFound = Validator.isDefined(userRecord);
      if (userWasFound) {
        // Since the userRecord is an instance of the UserSchema, it needs to be converted to an object.
        user = new User(userRecord);
      }
      return user;
    }
  }

  /**
   * Gets the user record from the database using the user's email.
   * @param  {String} userEmail The user email to search for.
   * @return {User} The user instance, if found; otherwise undefined.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   * @static
   */
  static async getByEmail(userEmail) {
    // GET THE USER BASED ON THE GIVEN EMAIL.
    let userRecord = false;
    try {
      userRecord = await UserModel.findOne({ email: userEmail }).exec();
    } catch (error) {
      console.log(
        "An error occurred while attempting to get a user by email.",
        error
      );
      // If an error occurs, it should be returned.
      return error;
    } finally {
      // If the user wasn't able to be found in the database, this routine should return undefined.
      let user = undefined;
      let userWasFound = Validator.isDefined(userRecord);
      if (userWasFound) {
        // Since the userRecord is an instance of the UserSchema, it needs to be converted to an object.
        user = new User(userRecord);
      }
      return user;
    }
  }

  /**
   * Gets the user's email.
   * @return {String} The user's email.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getEmail() {
    return String(this.email);
  }

  /**
   * Gets the document id of the user in the database as a string.
   * @return {String} The document id of the user.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  getId() {
    return String(this._id);
  }

  /**
   * Gets the user's first name.
   * @return {String} The user's name.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getFirstName() {
    return String(this.firstName);
  }

  /**
   * Gets the user's last name.
   * @return {String} The user's first name.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getLastName() {
    return String(this.lastName);
  }

  /**
   * Gets the user's address.
   * @return {String} The user's address.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getAddress() {
    return String(this.address);
  }

  /**
   * Gets the user's city.
   * @return {String} The user's city.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getCity() {
    return String(this.city);
  }

  /**
   * Gets the user's state.
   * @return {String} The user's state.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getState() {
    return String(this.state);
  }

  /**
   * Gets the user's zipCode.
   * @return {String} The user's zipCode.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getZipCode() {
    return String(this.zipCode);
  }

  /**
   * Gets the hash of the user's password.
   * @return {String} The user's password hash.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getPasswordHash() {
    return this.passwordHash;
  }

  /**
   * Gets the hash of the user's password.
   * @return {String} The user's password hash.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  getId() {
    return this._id;
  }

  /**
   * Used to remove any sensitive attributes so the object can be sent to the client.
   * @return {User} The user instance without any sensitive attributes.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   */
  removeSensitiveAttributes() {
    delete this.passwordHash;
    return this;
  }

  /**
   * This saves the associated user document in the database with the current properties
   * stored in this object.
   * @return {bool} True if the user was saved, false if the user wasn't saved.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @async
   */
  async save() {
    let userWasSaved = false;
    try {
      // GET THE DATABASE INSTANCE OF THE USER.
      let userModel = await UserModel.findOne({ _id: this._id }).exec();

      // UPDATE THE DATABASE INSTANCE WITH THE CURRENT USER PROPERTIES.
      Object.assign(userModel, this);

      // SAVE THE UPDATED DATABASE INSTANCE.
      await userModel.save();
      userWasSaved = true;
    } catch (error) {
      console.log(
        "An error occurred while attempting to retrieve the user to save."
      );
      console.log(error);
    } finally {
      return userWasSaved;
    }
  }

  /**
   * Sets the user's email.
   * @param {String} email The email to set.
   * @return {Boolean} True if the email was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  setEmail(email) {
    this.email = email;
    const emailSet = Validator.isDefined(this.email);
    return emailSet;
  }

  /**
   * Sets the user's firstName.
   * @param {String} name The firstName to set.
   * @return {Boolean} True if the firstName was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   * @async
   */
  setFirstName(firstName) {
    this.firstName = firstName;
    const firstNameSet = Validator.isDefined(this.firstName);
    return firstNameSet;
  }

  /**
   * Sets the user's lastName.
   * @param {String} name The lastName to set.
   * @return {Boolean} True if the lastName was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  setLastName(lastName) {
    this.lastName = lastName;
    const lastNameSet = Validator.isDefined(this.lastName);
    return lastNameSet;
  }

  /**
   * Sets the user's address.
   * @param {String} name The address to set.
   * @return {Boolean} True if the address was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  setAddress(address) {
    this.address = address;
    const addressSet = Validator.isDefined(this.address);
    return addressSet;
  }

  /**
   * Sets the user's city.
   * @param {String} name The address to city.
   * @return {Boolean} True if the address was city, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   * @async
   */
  setCity(city) {
    this.city = city;
    const citySet = Validator.isDefined(this.city);
    return citySet;
  }
  /**
   * Sets the user's state.
   * @param {String} name The state to set.
   * @return {Boolean} True if the state was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  setState(state) {
    this.state = state;
    const stateSet = Validator.isDefined(this.state);
    return stateSet;
  }
  /**
   * Sets the user's zipCode.
   * @param {String} name The zipCode to set.
   * @return {Boolean} True if the zipCode was set, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  setZipCode(zipCode) {
    this.zipCode = zipCode;
    const zipCodeSet = Validator.isDefined(this.zipCode);
    return zipCodeSet;
  }
  /**
   * Sets the user's password.
   * @param {String} newPassword The new password to set.
   * @return {Boolean} True if the password was updated, false otherwise.
   * @author Ethan Cannelongo
   * @async
   */
  async setPassword(newPasswordHash) {
    this.passwordHash = newPasswordHash;
    const passwordHashSet = Validator.isDefined(this.passwordHash);
    return passwordHashSet;
  }

  /**
   * Deletes the user
   * @return {Boolean} True if the password was updated, false otherwise.
   * @author Ethan Cannelongo
   * @async
   */
  async delete() {
    let userWasDeleted = false;

    try {
      const userModel = await UserModel.findOne({ _id: this._id }).exec();
      await userModel.remove();
      userWasDeleted = true;
    } catch (e) {
      return false;
    }
    return userWasDeleted;
  }
}
module.exports = User;
