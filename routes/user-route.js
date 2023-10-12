const express = require("express");
const router = express.Router();

const { param, body } = require("express-validator");

const userController = require("../controllers/user-controller");

router.get("/active-campaigns", userController.activeCampaigns);

router.post(
  "/register",

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  body("name").notEmpty().withMessage("Name is required").trim().escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.registerUser
);

router.get(
  "/user/:email/:domain",

  param("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getUser
);

router.get(
  "/campaign/:identifier",

  param("identifier")
    .notEmpty()
    .withMessage("Client identifier is required")
    .trim()
    .escape(),

  userController.getCampain
);

router.post(
  "/submitResponse",

  body("identifier")
    .notEmpty()
    .withMessage("Client Identifier is required")
    .trim()
    .escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  body("response")
    .notEmpty()
    .withMessage("Response is required")
    .isArray()
    .withMessage("Response must be an array")
    .custom((value) => {
      return value.every((item) => typeof item === "string");
    })
    .withMessage("Response must be an array of strings")
    .trim()
    .escape(),

  userController.submitResponse
);

router.get(
  "/getParticipatedCampaigns/:email/:domain",

  param("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getParticipatedCampaigns
);

router.post(
  "/getResponses",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  body("campaign_id")
    .notEmpty()
    .withMessage("Campaign ID is required")
    .trim()
    .escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getResponses
);

router.get(
  "/getCoupon/:email/:domain",

  param("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getCoupon
);

module.exports = {
  router: router,
};
