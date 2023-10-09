const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");

AdminJS.registerAdapter(AdminJSSequelize);

const db = require("../models");

const adminJS = new AdminJS({
  databases: [db],
  rootPath: "/admin",
  branding: {
    companyName: "Fulltoss",
  },
});

const router = AdminJSExpress.buildRouter(adminJS);

adminJS.watch();

module.exports = {
  router: router,
};
