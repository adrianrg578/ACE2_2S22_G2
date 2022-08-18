const express = require("express");
const { Server } = require("socket.io");
const router = express.Router();

router.get("/",(req,res)=> {
    res.send({response: "I am alive"}).status(200);
});


module.exports = router;