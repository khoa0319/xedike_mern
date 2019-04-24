module.exports = {
  authUser: (userType) => {
    return (req, res, next) => {
      if (req.user.userType === userType) {
        next();
      } else {
        res.json({ msg: "you don't have permissions" });
      }
    }
  }
}