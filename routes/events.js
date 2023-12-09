const express = require("express");
const Events = require("../models/events");
const { handleEventCreation,_,__ } = require("../controllers/events");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const events = await Events.find({}); // Retrieve all resources from the database
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving resources' });
    }
});
router.post("/create", handleEventCreation);
// router.delete("/delete/:id", handleResourceDeletion);
// router.put("/update/:id", handleResourceUpdation);
// router.get("/signup", (req, res) => {
//     return res.render("signup");
// });

// router.get("/login", (req, res) => {
//     return res.render("login");
// });

module.exports = router;