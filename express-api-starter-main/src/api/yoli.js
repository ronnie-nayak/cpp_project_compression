const express = require("express");

const router = express.Router();
// import { HuffmanCoder } from "./huffman.js";
const HuffmanCoder = require("../../middleware/huffman");

const coder = new HuffmanCoder();

router.post("/", (req, res) => {
  const { text } = req.body;
  const [decoded, tree_structure, info] = coder.decode(text);
  res.json({
    decoded,
    tree_structure,
    info,
  });
  // res.json(['😀', '😳', '🙄']);
});

module.exports = router;
