module.exports.errorNames = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

module.exports.errorTypes = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response.',
    statusCode: 401,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    statusCode: 500,
  },
};
