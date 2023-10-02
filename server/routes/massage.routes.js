const express = require("express");
const router = express.Router({mergeParams: true});
const Massage = require("../models/Massage")

router.get("/", async(req, res) => {
    try {        
        const list  = await Massage.find();        
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
})
router.post("/", async(req, res) => {    
    try {        
        const newMassage  = await Massage.create({...req.body});        
        res.status(201).send(newMassage);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
})

module.exports = router