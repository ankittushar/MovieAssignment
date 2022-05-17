const express=require('express');
const router=express.Router();

const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const movieSchema = new Schema({}, { strict: false });
const Movie = mongoose.model('Movie', movieSchema);

//Create Post
router.post('/add-movie', async (req,res)=>{
    const newMovie= new Movie(req.body);
    console.log(req.body);
    try{
        const saving=await newMovie.save();
        res.status(200).json(saving);

    }catch(err){
        res.send(err)
    }
})

router.get('/get-all', async(req,res)=>{

    try {
        const movies= await Movie.find();
        res.json(movies);
    } catch (error) {
        res.send(error);
    }

})

router.get('/get-single', async (req,res)=>{
    try{
        const movies=await Movie.findById(req.query.id);
        res.json(movies);
    }catch(error){
        res.send(error);
    }
})

router.get('/get-paginated', async (req,res)=>{
    const page= req.query.page;
    const size=req.query.size;
    const skips=(page-1)*size;
    if(size<=0 || size<=0){
        res.send("invalid query");
        return;
    }
    try{
        const movies=await Movie.find().skip(skips).limit(size);
        res.json(movies);
    }catch(error){
        res.send(error);
    }
})




module.exports=router;