
const constantInfo = require("../Global/constants")
const mongoose = require("mongoose");
const {db} = require('../configuration/config')
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log(constantInfo.dataBase.successfull);
    },
    (err) => {
      console.log(constantInfo.dataBase.error);
    }
  );
