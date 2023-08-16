const EAdata=require("../models/EAdata")


const dataEntry=async(req,res)=>{
    try {
        // const {district,revenueMandal,latitude, longitude,numberOfPolingBoothsForFemales,numberOfPolingBoothsForTransgenders, numberOfPolingBoothsForMales,polingStationPhoto,    assembly,policeStation, distributionRoute, polingStationName, evmStrongRoomLocation, evmDistributionPointLocation,  sensitivity}=req.body

        const data=await EAdata.create({...req.body})
        data.save()
        res.status(200).json({data,message:"EA data entry successful"})
    } catch (error) {
        res.status(400).json({message:"data entry not saved", error})
    }
}

const getData=async(req,res)=>{
    try {
        const data=await EAdata.find()
        res.status(200).json({data,message:"Data retrived"})
    } catch (error) {
        res.status(400).json({message:"Data not retrived", error})
    }
}

module.exports={dataEntry, getData}