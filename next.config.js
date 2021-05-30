const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "Lex",
        mongodb_password: "NiKa2019",
        mongodb_clustername: "cluster0",
        mongodb_database: "events-dev",
      },
    };
  }
  return {
    env: {
      mongodb_username: "Lex",
      mongodb_password: "NiKa2019",
      mongodb_clustername: "cluster0",
      mongodb_database: "events",
    },
  };
};
