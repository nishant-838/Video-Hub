const express = require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  addToHistory,
  getHistory
} = require(
  "../controllers/historyController"
);

router.post(
  "/",
  authMiddleware,
  addToHistory
);

router.get(
  "/",
  authMiddleware,
  getHistory
);

module.exports = router;