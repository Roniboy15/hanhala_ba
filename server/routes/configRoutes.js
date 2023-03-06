const indexR = require("./index");
const usersR = require("./users");
const applicantsR = require("./applicants");
const datenR = require("./daten");
const housesR = require("./houses");
const websitesR = require("./websites");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/applicants",applicantsR);
  app.use("/daten", datenR);
  app.use("/houses", housesR);
  app.use("/websites", websitesR);
}

app.use("*",(req,res) => {
  res.status(404).json({msg:"endpoint not found , 404",error:404})
})
