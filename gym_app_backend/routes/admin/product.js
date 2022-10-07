const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Product = require("../../models/Product");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


router.get("/products", [auth, admin], async(req, res) => {
    const products = await Product.find()
    
    res.send(products);
});


router.get("/products/:id", [auth, admin], async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
        return res.status(400).send("Product not found");
    }

    res.send(product);
});


router.post("/products", [auth, admin],async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            unit: Joi.string(),
            price: Joi.number().required(),
            quantity: Joi.number().min(0),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name,description,unit,price,quantity} = req.body;

         let product = new Product({
            name: name,
            description: description,
            unit: unit,
            price: price,
            quantity: quantity,
        });

        try {
            product = await product.save();
            res.send(product);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);


router.put("/products/:id", [auth, admin],async(req, res) => {
        // return res.send(req.body)
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            unit: Joi.string(),
            price: Joi.number().required(),
            quantity: Joi.number().min(0),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const {name,description,unit,price,quantity} = req.body;

        let product = await Product.findById(req.params.id);

        product.name = name,
        product.description = description,
        product.unit = unit,
        product.price = price,
        product.quantity = quantity;
        product = await product.save();

        if (!product) {
            return res.status(400).send("Product does not exist");
        }

        res.send(product);
    }
);


router.delete("/products/:id", [auth, admin], async(req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
        return res.status(404).send("Product not found ");
    }

    res.send(product);
});


//export

module.exports = router;