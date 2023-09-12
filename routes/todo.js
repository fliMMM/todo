const express = require("express");
const Todo = require("../model/todo");
const Router = express.Router();
const verifyAdminToken = require("../middleware/admin");

//creatt product
// POST /
Router.post("/create", async (req, res) => {
  const todoItem = req.body;
  console.log(todoItem);
  if (!todoItem) {
    return res
      .status(400)
      .json({ success: false, message: "Hãy nhập đầy đủ thông tin sản phẩm" });
  }
  try {
    const newTodo = new Todo({ ...todoItem });
    await newTodo.save();
    res.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: newTodo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

//delete product
// DELETE /delete
Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await Todo.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Xóa sản phẩm thành công",
      deleted: deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

//get product
// GET /
Router.get("/", async (req, res) => {
  try {
    const productList = await Product.find({ isDelete: false });
    res.json({ success: true, message: "thành công", data: productList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

//get product by id
Router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ isDelete: false, _id:id });
    res.json({ success: true, message: "thành công", data: product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

//chinh sua
//put /update
Router.post("/update", async (req, res) => {
  const product = req.body;

  try {
    await Todo.findByIdAndUpdate(product.id, { ...product });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

module.exports = Router;
