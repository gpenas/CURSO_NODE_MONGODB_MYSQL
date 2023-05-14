const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { authMiddleware } = require("../middleware/session");
const { checkRoles } = require("../middleware/roles");

//todo http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validatorGetItem, getItem);

router.post("/", authMiddleware, checkRoles(["admin", "user"]), validatorCreateItem, customHeader, createItem);

router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;