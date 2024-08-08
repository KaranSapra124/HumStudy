const fs = require("fs");
const path = require("path");
const Errorhandler = require("../utils/errorHandler");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

const getAllItems = async (name, model, res, next) => {
  try {
    const allItems = await model.find().sort({ createdAt: -1 });
    if (!allItems) return next(new Errorhandler(name + " not found", 404));
    res.json({
      success: true,
      message: `Retrieved ${name} successfully`,
      allItems,
    });
  } catch (err) {
    next(err);
  }
};

const uploadUserDocs = async (req, res, next, userId) => {
  const oldDocs = await User.findById(userId, { documents: 1 });
  // oldDocs.documents[req.params.name] = oldDocs.documents[req.params.name] || {};
  const oldFiles = [];
  let files = {};
  const updateObject = {};
  console.log(req.params.name, "NAME");

  if (req.files) {
    for (const key of Object.keys(req.files)) {
      const filesArray = req.files[key];
      for (const file of filesArray) {
        const fieldName = file.fieldname;
        const fileName = file.filename;
        if (new Object(oldDocs.documents).hasOwnProperty(req.params.name)) {
          oldFiles.push(oldDocs.documents[req.params.name][fieldName]);
        }
        // Assuming you want to update 'documents' field in the user object
        updateObject[`documents.${req.params.name}.${fieldName}`] = fileName;
      }
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: updateObject,
    },
    {
      new: true,
    }
  );

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (oldFiles.length > 0) await deleteFilesMethod(false, null, oldFiles);

  res.status(200).json({
    success: true,
    message: "Profile Updated Succesfully",
    item: user,
  });
};

const getItem = async (name, model, req, res, next) => {
  try {
    const item = await model.find({ _id: req.params.id });
    if (!item) return next(new Errorhandler(name + " not found", 404));
    res.json({
      success: true,
      message: `Retrieved ${name} successfully`,
      item,
    });
  } catch (err) {
    next(err);
  }
};

const getData = async (name, id, model, req, res, next) => {
  try {
    const item = await model.findOne({ _id: id });
    if (!item) return next(new Errorhandler(name + " not found", 404));
    res.status(200).json({
      success: true,
      message: `Retrieved ${name} successfully`,
      item,
    });
  } catch (err) {
    next(err);
  }
};

const addItem = async (name, model, req, res, next, customItem = null) => {
  try {
    const newItem = new model(customItem || req.body);

    // Save the new item to the database
    await newItem.save();

    // Return a success response containing the added item object
    res.status(201).json({
      success: true,
      message: `${name} added successfully`,
      newItem,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editItem = async (
  name,
  model,
  req,
  res,
  next,
  customItem = null,
  files = []
) => {
  try {
    const prevItem = await model.find({ _id: req.params.id });
    const updatedItem = await model.findByIdAndUpdate(
      req.params.id,
      customItem || req.body,
      {
        new: true,
      }
    );

    if (!updatedItem) return next(new Errorhandler(name + " not found", 404));

    if (req.file && files.length > 0 && prevItem.length > 0) {
      try {
        const errors = await deleteFiles(files, prevItem[0]);

        const error = errors.find((item) => !item.success);
        if (error) return res.json(error);
      } catch (error) {
        console.error("Error deleting files:", error);
        return res.json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      updatedItem,
      message: `${name} updated successfully!`,
    });
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (name, model, req, res, next, files = []) => {
  try {
    const deletedItem = await model.findByIdAndDelete(req.params.id);

    if (!deletedItem) return next(new Errorhandler(name + " not found", 404));

    if (files.length > 0 && files !== undefined && files !== null) {
      try {
        const errors = await deleteFiles(files, deletedItem);

        const error = errors.find((item) => !item.success);
        if (error) return res.json(error);
      } catch (err) {
        console.error("Error deleting files:", err);
        return res.json({
          success: false,
          message: "Internal server error",
          error: err?.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      deletedItem,
      message: `${name} deleted successfully!`,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAllItems = async (name, model, req, res, next, files = []) => {
  try {
    const deleteResult = await model.deleteMany({});

    if (!deleteResult || deleteResult.deletedCount === 0) {
      return next(new Errorhandler("No " + name + " found to delete", 404));
    }

    res.status(200).json({
      success: true,
      message: `All ${name} deleted successfully!`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFiles = async (files, data) => {
  let errors = [];
  for (let item of files) {
    try {
      await fs.unlink(
        path.join(__dirname, "../uploads/", data[item]),
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
    } catch (err) {
      errors.push({
        success: false,
        message: `Error deleting files`,
        error: err.message,
      });
    }
  }
  return errors;
};

module.exports = {
  getAllItems,
  getItem,
  editItem,
  getData,
  deleteItem,
  deleteAllItems,
  addItem,
  uploadUserDocs,
  deleteFiles,
};
