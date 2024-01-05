const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/login")

connect.then(()=>{
    console.log("connected successfully")
})
.catch(()=>{
    console.log("not connected")
})
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    repassword:{
        type:String,
        require: true
    }
})
const pokemonSchema = new mongoose.Schema({
    abilities: {
        type:Array
    },
    detailPageURL:{
        type:String
    },
    weight:{
        type:Number
    },
    weakness:{
        type:Array
    },
    number:{
        type:String
    },
    height:{
        type:Number
    },
    collectibles_slug:{
        type:Array
    },
    featured:{
        type:String
    },
    slug:{
        type:String
    },
    name:{
        type:String
    },
    ThumbnailAltText:{
        type:String
    },
    ThumbnailImage:{
        type:String
    },
    id:{
        type:Number
    },
    type:{
        type:Array
    }
})
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    pokemonData: [pokemonSchema], 
  });
const collections  = new mongoose.model("logininfo",loginSchema);
const pokemon = new mongoose.model('likedPokemons', userSchema);
module.exports = {collections,pokemon}
