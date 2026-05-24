const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, deleteUser, getAnalytics, toggleUserStatus, updateProfile } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authmiddleware");
const { authorize } = require("../middleware/rolemiddleware");

router.put("/profile", protect, updateProfile);
router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/analytics", protect, authorize("admin"), getAnalytics);
router.get("/:id", protect, authorize("admin"), getUserById);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.put("/:id/status", protect, authorize("admin"), toggleUserStatus);

module.exports = router;
