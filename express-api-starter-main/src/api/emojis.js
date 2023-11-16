const express = require("express");

const router = express.Router();
// import { HuffmanCoder } from "./huffman.js";
const HuffmanCoder = require("../../middleware/huffman");

const coder = new HuffmanCoder();

router.post("/", (req, res) => {
  const { text } = req.body;
  const [encoded, tree_structure, info] = coder.encode(text);
  res.json({
    encoded,
    tree_structure,
    info,
  });
  // res.json(['😀', '😳', '🙄']);
});

module.exports = router;
