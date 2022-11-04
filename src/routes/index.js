const userRoute = require("./user");
const followRoute = require("./follow")
const tweetRoute = require("./tweet")

const configRoutes = (app) => {
  app.use("/users", userRoute);
  app.use("/follow",followRoute)
  app.use("/tweet", tweetRoute);
 
};

module.exports = configRoutes;