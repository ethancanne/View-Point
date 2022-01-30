/**
 * This is used to validate and verify data throughout the application.
 * @author Ethan Cannelongo
 * @date   01/29/2022
 */
class Validator {
  /**
   * Checks if a variable is defined.
   * @param variable The variable to check for being defined.
   * @return {bool} True if the variable is defined, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static isDefined(variable) {
    const undefinedType = "undefined";
    const isNotUndefined = undefinedType !== typeof variable;
    const isNotNull = null != variable;
    return isNotUndefined && isNotNull;
  }

  /**
   * Checks if a variable is undefined.
   * @param variable The variable to check for being undefined.
   * @return {bool} True if the variable is undefined, false otherwise.
   * @author Ethan Cannelongo
   * @date   01/29/2022
   * @static
   */
  static isUndefined(variable) {
    const undefinedType = "undefined";
    return undefinedType === typeof variable;
  }
}

module.exports = Validator;
