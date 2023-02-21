const usersR = require("./users");
const applicantsR = require("./applicants");
const datenR = require("./daten");
const housesR = require("./houses");


exports.routesInit = (app) => {
  app.use("/users",usersR);
  app.use("/applicants",applicantsR);
  app.use("/daten", datenR);
  app.use("/houses", housesR);


// כל ראוט אחר שנגיע שלא קיים בתקיית פאליק או כראוט
// נקבל 404
 /* app.use("*",(req,res) => {
    res.status(404).json({msg:"endpoint not found , 404",error:404})
  })
}*/}