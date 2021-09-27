const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token

  // * VERIFYING INCOMING TOKEN WITH FIREBASE
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER - AUTH CHECK", firebaseUser);

    // * MAKE USER AVAILABLE TO THE CONTROLLER METHOD
    req.user = firebaseUser;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

// * ADDING EXTRA LAYER OF SECURITY FOR ADMIN
exports.adminCheck = async (req, res, next) => {
  // grab email from logged in user
  // bcoz in order to run this -- authCheck have already been executed
  const { email } = req.user;

  // get admin user based on email
  const adminUser = await User.findOne({ email }).exec();

  // check for role
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin Credentials Required. Access Denied.",
    });
  } else {
    next();
  }
};
