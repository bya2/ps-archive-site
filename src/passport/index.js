const local = require('./local');


module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ email: id }, (err, user) => {

    })
  });

  local(passport);
}