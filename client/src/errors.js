const makeError = (statusCode, name, description) => {
  const error = new Error(description);
  error.statusCode = statusCode;
  error.body = {
    error: name,
    error_description: description
  };
  return Promise.reject(error);
};

const invalidRequest = (description) => makeError(400, 'invalid_request', description);

const invalidClient = (description) => makeError(401, 'invalid_client', description);

const unsupportedGrantType = (grantType) => makeError(400, 'unsupported_grant_type', `Unsupported grant type '${grantType}'`);

module.exports = {
  invalidClient,
  invalidRequest,
  unsupportedGrantType
};
