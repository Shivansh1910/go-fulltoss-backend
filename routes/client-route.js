const express = require("express");
const router = express.Router();

const { param, body } = require("express-validator");

const clientController = require("../controllers/client-controller");

router.post(
  "/register-client",

  body("name").notEmpty().withMessage("Name is required").trim().escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  clientController.registerClient
);

router.get(
  "/get-client/:domain",

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  clientController.getClient
);

module.exports = {
  router: router,
};
