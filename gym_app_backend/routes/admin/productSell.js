const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Sell = require("../../models/Sell");
const Product = require("../../models/Product");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


router.get("/productSells", [auth, admin], async(req, res) => {
    const sells = await Sell.find()
    
    res.send(sells);
});


router.get("/productSells/:id", [auth, admin], async(req, res) => {
    const sell = await Sell.findById(req.params.id)
    
    if (!sell) {
        return res.status(400).send("Product Sell not found");
    }

    res.send(sell);
});


router.post("/productSells", [auth, admin],async(req, res) => {
        const schema = Joi.object({
            traineeId: Joi.objectId().required(),
            date: Joi.date().required(),
            productId: Joi.objectId().required(),
            quantity: Joi.number().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { traineeId,date,productId,quantity} = req.body;

        const product = await Product.findById(productId)
        product.quantity=product.quantity-quantity
        await product.save()

        let sell = new Sell({
            traineeId: traineeId,
            date: date,
            productId: productId,
            quantity: quantity,
            unitPrice:product.price,
            totalPrice:product.price*quantity
        });

        try {
            sell = await sell.save();
            res.send(sell);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);


router.put("/productSells/:id", [auth, admin],async(req, res) => {
        // return res.send(req.body)
        const schema = Joi.object({
            traineeId: Joi.objectId().required(),
            date: Joi.date().required(),
            productId: Joi.objectId().required(),
            quantity: Joi.number().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { traineeId,date,productId,quantity} = req.body;

        let product = await Product.findById(productId)
        let sell = await Sell.findById(req.params.id);
        
        product.quantity=parseInt(product.quantity)+(parseInt(sell.quantity)-parseInt(quantity))
        await product.save()
        
        sell.traineeId = traineeId,
        sell.date = date,
        sell.productId = productId,
        sell.quantity = quantity,
        sell.unitPrice=product.price
        sell.totalPrice=product.price*quantity
        sell = await sell.save();

        if (!sell) {
            return res.status(400).send("Product Sell does not exist");
        }

        res.send(sell);
    }
);


router.delete("/productSells/:id", [auth, admin], async(req, res) => {
    let sell = await Sell.findById(req.params.id)
    
    let product=await Product.findById(sell.productId)
    product.quantity=product.quantity+sell.quantity
    await product.save()

    sell =await sell.remove()

    if (!sell) {
        return res.status(404).send("Product Sell not found ");
    }

    res.send(sell);
});


//export

module.exports = router;