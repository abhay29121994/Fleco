const adminMiddleware = async (req, res, next) => {
  try {
    const admin = req.user.isAdmin;
    console.log(admin);
    if (JSON.parse(admin)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. User not admin " });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
