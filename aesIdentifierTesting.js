const crypto = require('crypto');

/**
 * Transforms a canonical identifier into a user-specific identifier.
 * 
 * This takes an internal identifier and the user id to return an identifier
 * for the internal object which is unique for that user. This sample is 
 * written to be synchronous, but could be written to be async just fine.
 * 
 * @param {string} id - internal canonical identifier
 * @param {string} userId - user identifier, representing the invoking user
 * 
 * @returns {string} a user-specific identifier using 'hex' encoding
 */
function canonicalToUserIdentifier(id, userId){
  const mySecret = "This is a password used to derive a key."
  //Super simple user-specific key creation, there are definitely better 
  //ways to do this, but given I assume lots of validation will be done
  //around this userId (since it will be derived from a signed token),
  //concatenation is probably fine.
  var userPassword = mySecret + userId;
  //Using a 256 bit key length, since it lines up nicely with SHA
  const hash = crypto.createHash('sha256');
  hash.update(userPassword);
  var key = hash.digest();
  //Using an empty (or known) iv - since otherwise we would need to transmit 
  //it, which can't be repeated between sessions, and therefore breaks the 
  //'MUST be immutable across sessions' requirement
  //...
  const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
  let userIdentifier = cipher.update(id, 'utf8', 'hex');
  userIdentifier += cipher.final('hex');
  return userIdentifier;
}

/**
 * Transforms a user-specific identifier into a canonical identifier.
 * 
 * This takes a user-specific identifier and the user id to return the internal
 * identifier for an object. This sample is  written to be synchronous, but 
 * could be written to be async just fine.
 * 
 * @param {string} id - user-specific identifier (assuming hex)
 * @param {string} userId - user identifier, representing the invoking user
 * 
 * @returns {string} an internal canonical identifier (assuming utf8)
 */
function userToCanonicalIdentifier(id, userId){
  const mySecret = "This is a password used to derive a key."
  //Simple user-specific key creation, see above.
  var userPassword = mySecret + userId;
  const hash = crypto.createHash('sha256');
  hash.update(userPassword);
  var key = hash.digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
  //Note that the id is somewhat user controlled here - I assume you have a lot
  //validation and error catching around this. This will for instance, throw a
  //TypeError if the string can't be parsed as hex.
  let canonicalIdentifier = decipher.update(id, 'hex', 'utf8');
  canonicalIdentifier += decipher.final('utf8');
  return canonicalIdentifier;
}

var testCanonicalId = "1234567890";
var testUserId = "Alice";
var userSpaceId = canonicalToUserIdentifier(testCanonicalId, testUserId)
//Prints:14b139b5b0d221cddebf9790f8cf210f
console.log(userSpaceId);
var canonicalSpaceId = userToCanonicalIdentifier(userSpaceId, testUserId);
//Prints:1234567890
console.log(canonicalSpaceId);

