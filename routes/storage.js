
const express = require("express");
const router = express.Router();
const { validatorGetItem } = require("../validators/storage")
const uploadMiddleware = require("../utils/handleStorage")
const {getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/storage") 
const { authMiddleware } = require("../middleware/session");
const { checkRoles } = require("../middleware/roles");

router.get("/", getItems);

router.get("/:id", authMiddleware,validatorGetItem, getItem);

router.post("/", authMiddleware, uploadMiddleware.single("myfile"), createItem);

//router.put("/:id", uploadMiddleware.single("myfile"), updateItem);

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;