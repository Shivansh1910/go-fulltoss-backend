const adminRouter = require("./routes/admin-route");
const userRouter = require("./routes/user-route");
const clientRouter = require("./routes/client-route");
const version = "/api/v1/";

const ENV = process.env.NODE_ENV || "development";

const routerRegistration = (app) => {
  if (ENV === "development") {
    app.use("/admin", adminRouter.router);
  }

  app.use(version, userRouter.router);
  app.use(version, clientRouter.router);
};

module.exports = routerRegistration;
