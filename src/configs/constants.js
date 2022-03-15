module.exports = {
    NOT_FOUND: (entity) => `${entity} does not exist yet`,
    DUPLICATE_ENTRY: (entity) => `This ${entity} is already in use`,
    SERVER_ERROR:(entity) => `oops something went wrong in ${entity} endpoint`
  };
   