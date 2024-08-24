const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const name = user.email.split('@')[0]
    console.log(name)
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET,);
    res.status(200).json({ token ,name});
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};
