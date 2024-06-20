var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function(req, res, next) {
  console.log(req.files.avatar)
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);
  if(!resultCopy) {
    console.log('je suis dans la condition')
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    res.json(resultCloudinary);
  } else {
    res.json({error: resultCopy});
  }

  fs.unlinkSync(pictureName);
  
});

module.exports = router;
