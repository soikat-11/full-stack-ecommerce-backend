const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  // * CREATING AND SAVING USER TO THE DB
  const { name, picture, email } = req.user;

  // check if creating or updating user
  // if user already created - don't duplicate

  // * UPDATE 1 USER - TAKES 3 ARGUMENTS
  // * ARG 1 - search filter / ARG 2 - update filters / ARG 3 - new: true
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    // * USER DOES NOT EXIST - CRERATE USER - & SAVE IN DB
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();

    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);

    // send response
    res.json(user);
  });
};
