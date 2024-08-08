const fs = require("fs");
const path = require("path");

exports.deleteFiles = async (keys, data, files = []) => {
  let errors = [];
  console.log(path.join(__dirname, "../uploads/"));
  try {
    if (files.length > 0 || !keys) {
      files.forEach(
        async (filename) =>
          await fs.unlink(
            path.join(__dirname, "../uploads/", filename),
            (err) => {
              if (err)
                errors.push({
                  success: false,
                  message: "Error deleting files",
                  error: err.message,
                });
              else errors.push({ success: true });
            }
          )
      );
    } else
      for (let key of keys) {
        if (Array.isArray(data[key])) {
          data[key].forEach(
            async (img, i) =>
              await fs.unlink(
                path.join(__dirname, "../uploads/", data[key][i]),
                (err) => {
                  if (err)
                    errors.push({
                      success: false,
                      message: "Error deleting files",
                      error: err.message,
                    });
                  else errors.push({ success: true });
                }
              )
          );
        } else {
          await fs.unlink(
            path.join(__dirname, "../uploads/", data[key]),
            (err) => {
              if (err)
                errors.push({
                  success: false,
                  message: `Error deleting files`,
                  error: err.message,
                });
              else errors.push({ success: true });
            }
          );
        }
      }
  } catch (err) {
    errors.push({
      success: false,
      message: `Error deleting files`,
      error: err.message,
    });
  }
  const error = errors.find((item) => !item.success);
  if (error) return new Error("error");
};
