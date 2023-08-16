const mongoose=require("mongoose")

const eaSchema=new mongoose.Schema({
    district:{
        type:String,
        required:true,
        trim:true
    },
    revenueMandal:{
        type:String,
        required:true,
        trim:true
    },
    returningOfficer:{
        type:String,
        required:true,
        trim:true
    },
    latitude:{
        type:String,
        required:true,
        trim:true
    },
    longitude:{
        type:String,
        required:true,
        trim:true
    },
    totalVoters:{
        type:Number,
        required:true
    },
    numberOfPollingStationsForFemales:{
        type:Number,
        required:true
    },
    numberOfPollingStationsForTransgenders:{
        type:Number,
        required:true,
    },
    numberOfPollingStationsForMales:{
        type:Number,
        required:true
    },
    pollingStationPhoto:{
        type:String,
        required:true,
    },
    assembly:{
        type:String,
        required:true,
        trim:true
    },
    acnumber:{
        type:Number,
        required:true,
    },
    policeStation:{
        type:String,
        required:true,
        trim:true
    },
    policeStationNumber:{
        type:Number,
        required:true,
    },
    pollingRoute:{
        type:Number,
        required:true
    },
    pollingStationName:{
        type:String,
        required:true
    },
    pollingStationNumber:{
        type:Number,
        required:true,
    },
    evmStrongRoomLocation:{
        type:String,
        required:true
    },
    evmDistributionPointLocation:{
        type:String,
        required:true
    },
    categoryOfLocation:{
        type:String,
        required:true
    },
    strikingForceIC: {
        type:String,
        required:true
    },
  revenueSectorIC: {
        type:String,
        required:true
    },
  policeRouteIC: {
        type:String,
        required:true
    },
  localPoliceIC: {
        type:String,
        required:true
    },
  shophn: {
        type:Number,
        required:true
    },
  icACPphn: {
        type:Number,
        required:true
    },
  icDCPphn: {
        type:Number,
        required:true
    },
  qrtIC: {
        type:String,
        required:true
    },
})

module.exports=mongoose.model("EAdata",eaSchema)