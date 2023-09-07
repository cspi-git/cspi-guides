"use strict";

// Dependencies
const compress = require("compression")
const express = require("express")
const path = require("path")

// Variables
const port = process.env.PORT || 8080
const web = express()

/// Configurations
//* Express
web.use(compress({ level: 1 }))

// Main
web.use(express.static(path.join(__dirname, "public")))
web.use("*", (req, res)=>res.redirect("/"))
web.listen(port, ()=>{console.log(`Server is running. Port: ${port}`)})