const indexR = require("./index");
const usersR = require("./users");
const applicantsR = require("./applicants");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/applicants",applicantsR);


// כל ראוט אחר שנגיע שלא קיים בתקיית פאליק או כראוט
// נקבל 404
  app.use("*",(req,res) => {
    res.status(404).json({msg:"endpoint not found , 404",error:404})
  })
}