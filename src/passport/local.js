const LocalStrategy = require('passport-local').Strategy;

module.exports = passport => {
  const options = {

  };

  passport.use(new LocalStrategy(options, (username, password, done) => {
    
  }));
}







