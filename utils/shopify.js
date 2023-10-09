// require("dotenv").config();

// const { shopifyApp } = require("@shopify/shopify-app-express");

// const PORT = process.env.PORT || 8000;

// const shopify = shopifyApp({
//   api: {
//     apiKey: "9983de871b4cfab428de4894dececed3",
//     apiSecretKey: "d8ffd56a4ddaa6b079df841eeafd490f",
//     scopes: ["write_products", "read_script_tags", "write_script_tags"],
//     hostScheme: "http",
//     hostName: `localhost:${PORT}`,
//   },
//   auth: {
//     path: "/api/auth",
//     callbackPath: "/api/auth/callback",
//   },
//   webhooks: {
//     path: "/api/webhooks",
//   },
// });

// module.exports = {
//   shopify: shopify,
// };

require("dotenv").config();
const session = require("express-session");
const { createShopifyAuth } = require("shopify-auth-node");
