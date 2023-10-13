const express = require("express");
const router = express.Router();

const { param, body } = require("express-validator");

const userController = require("../controllers/user-controller");

router.get("/active-campaigns", userController.activeCampaigns);

router.post(
  "/register",

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .escape(),

  body("shopifyUserID")
    .isString()
    .withMessage("Invalid Shopify User ID")
    .trim()
    .escape(),

  body("name").notEmpty().withMessage("Name is required").trim().escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.registerUser
);

router.get(
  "/user/:shopifyUserID/:domain",

  param("shopifyUserID")
    .notEmpty()
    .withMessage("shopifyUserID is required")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getUser
);

router.get(
  "/campaign/:domain",

  param("domain")
    .notEmpty()
    .withMessage("Client domain is required")
    .trim()
    .escape(),

  userController.getCampain
);

router.post(
  "/submitResponse",

  body("shopifyUserID")
    .notEmpty()
    .withMessage("shopifyUserID is required")
    .trim()
    .escape(),

  body("domain").notEmpty().withMessage("Domain is required").trim().escape(),

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
  "/getParticipatedCampaigns/:shopifyUserID/:domain",

  param("shopifyUserID")
    .notEmpty()
    .withMessage("shopifyUserID is required")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getParticipatedCampaigns
);

router.post(
  "/getResponses",

  body("shopifyUserID")
    .notEmpty()
    .withMessage("shopifyUserID is required")
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
  "/getCoupon/:shopifyUserID/:domain",

  param("shopifyUserID")
    .notEmpty()
    .withMessage("shopifyUserID is required")
    .trim()
    .escape(),

  param("domain").notEmpty().withMessage("Domain is required").trim().escape(),

  userController.getCoupon
);

module.exports = {
  router: router,
};
