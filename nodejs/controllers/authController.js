
  const userHelpers = require('../helpers/user-helper')

  module.exports.login_post = (req, res) => {
    userHelpers.userLogin(req.body).then((data)=>{
      if(data.status==true){
        res.send({results:req.body,status:true,message:'login successfull',access_token:data.access_token})
      }
      else{
        res.send({message:'invalid credentials',status:false})
      }
    })
  }

  module.exports.registration_post=  (req, res) => {
     userHelpers.userRegistration(req.body).then((data)=>{
      res.json({results:data,message:'Registration successfull'})
    },
    err=>{
      res.json(err);
    })
  }