function randomNum() {
  return Math.floor(Math.random() * 10e6);
}

function generateRandomNum(userContext, events, done) {
  const id = randomNum();

  // add variables to virtual user's context:
  userContext.vars.id = id;
  // continue with executing the scenario:
  return done();
}

module.exports = { generateRandomNum };
