const adminRouter = require("./routes/admin-route");
const userRouter = require("./routes/user-route");
const version = "/api/v1/";

const ENV = process.env.NODE_ENV || "development";

const routerRegistration = (app) => {
  if (ENV === "development") {
    app.use("/admin", adminRouter.router);
  }

  app.use(version, userRouter.router);
};

module.exports = routerRegistration;
