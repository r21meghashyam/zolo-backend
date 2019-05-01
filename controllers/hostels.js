const Hostel = require('../models/hostel');

const create=async (req,res)=>{
    try{
        const { name,city,locality, description, location,landmarks} = req.body;
        if(!name)
            return res.status(403).json({
                status:403,
                message:'Error: Name missing'
            })
        if(!city)
            return res.status(403).json({
                status:403,
                message:'Error: City missing'
            })
        if(!locality)
            return res.status(403).json({
                status:403,
                message:'Error: Locality missing'
            })
        if(!description)
            return res.status(403).json({
                status:403,
                message:'Error: Description missing'
            })
        if(!location)
            return res.status(403).json({
                status:403,
                message:'Error: Location missing'
            })
        if(!landmarks)
            return res.status(403).json({
                status:403,
                message:'Error: Landmarks missing'
            })

        let hostel =  await Hostel.create({
            name,
            city,
            locality, 
            description, 
            location,
            landmarks
        })
        res.json({
            status:200,
            data:hostel
        })
    }
    catch(err){
        console.log(err);res.status(500).json({
            status:500,
            message: 'Internal Server Error'
        });
    }
}

const getAll=async (req,res)=>{
    try{
        let hostels =  await Hostel.find();
        res.json({
            status:200,
            data: hostels
        })
    }
    catch(err){
        console.log(err);res.status(500).json({
            status:500,
            message: 'Internal Server Error'
        });
    }
}

const get=async (req,res)=>{
    try{
        const { hostel_id } = req.params;
        if(!hostel_id)
            return res.status(403).json({
                status:403,
                message:'Error: ID missing'
            })
        let hostel =  await Hostel.findById(hostel_id);
        if(!hostel)
            return res.status(404).json({
                status:404,
                message:'Error: Hostel Not Found'
            })
        res.json({
            status:200,
            data: hostel
        })
    }
    catch(err){
        console.log(err);res.status(500).json({
            status:500,
            message: 'Internal Server Error'
        });
    }
}

module.exports={create,get,getAll}