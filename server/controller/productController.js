const Product = require('../model/productModel')
const jwt = require('jsonwebtoken')

exports.createProduct = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: 'Product Created Successfully' });
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      const products = await Product.find();
      res.status(200).json(products);
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      const product = await Product.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ message: 'Product Updated Successfully' });
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(204).send()
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};