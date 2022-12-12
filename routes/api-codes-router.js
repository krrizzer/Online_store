const express = require("express");
const router = express.Router();
const {
  getAllCodes,
  getCodeDetails,
  modifyCode,
  deleteCode,
  addCode,
} = require("../models/codes");

router.get("/codes", async (req, res) => {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);

  const codes = await getAllCodes(offset, limit);

  res.json(codes);
});

router.get("/codes/:code_id", async (req, res) => {
  const code_id = req.params.code_id;

  const code = await getCodeDetails(code_id);

  res.json(code);
});

router.post("/codes", async (req, res) => {
  const code = {
    brand: req.body.newCode.brand,
    price: req.body.newCode.price,
    code: req.body.newCode.code,
    image: '/images/' + req.body.newCode.brand + '.jpg',
    status: 'available'
  }
  console.log('HERE ' + code);
  console.log(code);
  
  const newCode = await addCode(code);

  res.json(newCode);
});

router.put("/codes/:code_id", async (req, res) => {
  const code_id = req.params.code_id;
  const code = req.body;

  const updatedCode = await modifyCode(code_id, code);

  res.json(updatedCode);
});

router.delete("/codes/:code_id", async (req, res) => {
  const code_id = req.params.code_id;

  const deletedCode = await deleteCode(code_id);

  res.json(deletedCode);
});

module.exports = router;
