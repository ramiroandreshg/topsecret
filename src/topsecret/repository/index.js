const {
  repository: { type },
} = require(`../../config/config`);

const Repository = require(`./${type}-repository`);
module.exports = Repository;
