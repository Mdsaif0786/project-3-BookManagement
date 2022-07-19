const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",
  secretAccessKey: "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",
  region: "us-east-1",
});

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link
    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log(data);
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const aws1 = async function (req, res, next) {
  try {
    let files = req.files;
    if(!files){
        return res
        .status(400)
        .send({ status: false, message: " Please Provide  Image" });
    
    }
    console.log(files);
    if (!files && files.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: " Please Provide The Profile Image" });
    }
    const uploadedBookImage = await uploadFile(files[0]);
    req.file = uploadedBookImage;

    // res.send({ status: true, msg: uploadedBookImage });
    next();
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.aws1 = aws1;