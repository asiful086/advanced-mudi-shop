const path = require("path");
const fs = require("fs");
const { generateRandomString } = require("./randomString");

module.exports.multiplePhotoUpload = async (file, uploadPath) => {
  let allPhotoNames = [];
  await Promise.all(
    file.map(async (item) => {
      const { createReadStream, filename, mimetype, encoding } = await item;
      // generateRandomString
      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../public/${uploadPath}/${randomName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      allPhotoNames.push(randomName);
    })
  );
  return allPhotoNames;
};
