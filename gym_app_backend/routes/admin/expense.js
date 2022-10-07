const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");
const Expense = require("../../models/Expense");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all expense list in the admin panel
router.get("/expenses", [auth, admin], async(req, res) => {
    const expenses = await Expense.find()
        .sort({ _id: -1 })
        .populate("entryBy", ["firstname", "lastname"]);

    res.send(expenses);
});

// to get a single expense details in the admin panel
router.get("/expenses/:id", [auth, admin], async(req, res) => {
    const expense = await Expense.findById(req.params.id).populate("entryBy", [
        "firstname",
        "lastname",
    ]);

    if (!expense) {
        return res.status(400).send("Expense not found");
    }

    res.send(expense);
});

// to post a new expense data in the admin panel
router.post("/expenses", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        amount: Joi.number().min(0).required(),
        date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, amount, date } = req.body;

    let expense = new Expense({
        name: name,
        amount: amount,
        date: date,
        entryBy: req.user.id,
    });

    try {
        expense = await expense.save();
        const expenses = await Expense.find()
            .sort({ _id: -1 })
            .populate("entryBy", ["firstname", "lastname"]);

        res.send(expenses);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to update a single expense data in the admin panel
router.put("/expenses/:id", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        amount: Joi.number().min(0).required(),
        date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, amount, date } = req.body;

    const expense = await Expense.findByIdAndUpdate(
        req.params.id, {
            name: name,
            amount: amount,
            date: date,
        }, { new: true }
    );

    const expenses = await Expense.find()
        .sort({ _id: -1 })
        .populate("entryBy", ["firstname", "lastname"]);

    if (!expense) {
        return res.status(400).send("Expense does not exist");
    }

    res.send(expenses);
});

// to delete a single expense data in the admin panel
router.delete("/expenses/:id", [auth, admin], async(req, res) => {
    const expense = await Expense.findByIdAndRemove(req.params.id);

    if (!expense) {
        return res.status(404).send("Expense not found ");
    }
    const expenses = await Expense.find()
        .sort({ _id: -1 })
        .populate("entryBy", ["firstname", "lastname"]);
    res.send(expenses);
});

//export

module.exports = router;