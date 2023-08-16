const express=require("express")
const { dataEntry, getData } = require("../controllers/eaDataEntryController")
const router=express.Router()

router.post("/entry",dataEntry)
router.get("/get",getData)

module.exports=router