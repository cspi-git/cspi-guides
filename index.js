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
web.use((req, res, next) => {
    // Check if the response is HTML
    if (res.getHeader('Content-Type') && res.getHeader('Content-Type').includes('text/html')) {
      // Define the meta tags
      const metaTags = `
        <link rel="icon" href="/favicon.png">
        <meta property="og:title" content="CSPI Unrestricted">
        <meta property="og:description" content="Unrestricted information about CSPI.">
        <meta name="theme-color" content="#232425">
      `;
  
      // Function to inject the meta tags into the response
      const injectMetaTags = (body) => {
        // Look for the </head> tag in the HTML response and inject the meta tags before it
        return body.replace('<link rel="icon" sizes="96x96" href="https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/favicon-96x96.png">', metaTags);
      };
  
      // Wrap the res.send method to intercept the response and inject the meta tags
      const originalSend = res.send;
      res.send = function (body) {
        if (body && typeof body === 'string') {
          // If the response body is a string, inject the meta tags
          body = injectMetaTags(body);
        }
        originalSend.call(this, body);
      };
    }
  
    next();
  });

web.use(express.static(path.join(__dirname, "public")))
web.use("*", (req, res)=>res.redirect("/"))
web.listen(port, ()=>{console.log(`Server is running. Port: ${port}`)})