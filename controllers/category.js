const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");

// * CATEGORY CREATE
exports.create = async (req, res) => {
  try {
    // get name from frontend and slugify
    const { name } = req.body;
    // console.log(req.body.name);
    // const category = await new Category({ name, slug: slugify(name) }).save();

    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};

// * CATEGORY LIST
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ caretedAt: -1 }).exec());
};

// * CATEGORY READ
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);

  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

// * CATEGORY UPDATE
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update category failed");
  }
};

// * CATEGORY REMOVE
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete category failed");
  }
};

// * TO GET SUB-CATEGORIES IN CREATE PRODUCT PAGE
exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
