const express =require("express");
const { getAllItems, addItem, editItem, deleteItem } = require("../../methods/commonMethods");
const Plans = require("../../models/plans");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const { adminAuth } = require("../../middlewares/authMiddleware");
const router=express.Router()

router.get(
    "/get",
    errorCatch(async (req, res, next) => getAllItems("Plans", Plans, res, next))
  );
  router.post(
    "/create",adminAuth,
    errorCatch(async (req, res, next) => addItem('Plans', Plans, req, res, next))
  );
  router.post(
    "/update/:id",adminAuth,
    errorCatch(async (req, res, next) => editItem('Plans', Plans, req, res, next))
  );
  
  router.post(
    "/delete/:id",adminAuth,
    errorCatch(async (req, res, next) => deleteItem('Plans', Plans, req, res, next))
  );

  
  module.exports =router