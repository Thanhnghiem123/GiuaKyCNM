require("dotenv").config();

const {s3} = require("../utils/aws-helper")

const randomString = numberChacracter => {
    return `${Math.random()
    .toString(36)
    .substring(2, numberChacracter + 2)}`;
};

const FILE_TYPE_MATCH = [
    "image/png",
    "image/jpg",
    "image/gif",
    "image/jpeg",

]

const uploadFile = async (file) => {

    console.log(file.originalname);
    const filepath = `${randomString(4)}-${new Date().getTime()}-${file?.originalname}`;
    console.log(filepath);

    if(FILE_TYPE_MATCH.indexOf(file.mimetype) === -1) {
        throw new Error(`${file?.originalname} is invalid `);
    }

    const uploadParams = {
        Bucket: process.env.BUCKET,
        Body: file?.buffer,
        Key: filepath,
        ContentType: file?.mimetype,
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        console.log(data.Location);
        return data.Location;
    }catch (error) {
        console.error("Error uploadding");
        throw new Error("Upload file to aws s2 failed");
    }
    
}


module.exports = {uploadFile};