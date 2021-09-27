const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

// * CATEGORY CREATE
exports.create = async (req, res) => {
  try {
    // get name from frontend and slugify
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub-category failed");
  }
};

// * CATEGORY LIST
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ caretedAt: -1 }).exec());
};

// * CATEGORY READ
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();

  res.json({
    sub,
    products,
  });
};

// * CATEGORY UPDATE
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update sub-category failed");
  }
};

// * CATEGORY REMOVE
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete sub-category failed");
  }
};
