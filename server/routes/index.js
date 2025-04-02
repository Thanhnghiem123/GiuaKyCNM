// const Router = require('express').Router;
// const router =Router();

// router.get("/", (req, res) => {
//     res.render("index");
// });

// module.exports = router;



const express = require("express");
const app = express();
const paperRoute =  require("./paper.route");
app.use("/papers", paperRoute);

module.exports = app;