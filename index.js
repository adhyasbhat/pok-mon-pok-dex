const express = require('express');
const path = require('path');
const {collections,pokemon} = require("./config");
const app = express();
const session = require('express-session');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
let userDeatils;
const bcrypt = require('bcryptjs');
const salt = 10;
app.use(express.static(__dirname));
const crypto = require('crypto');
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
// app.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, 'login.html'));
// });
app.get("/createuser", (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

const validator = require('validator');
const { json } = require('body-parser');
app.post("/createuser", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        repassword: req.body.repassword
    };
    userDeatils = req.body.username ;
    if (!validator.isEmail(data.name)) {
        res.status(400).send("Invalid email format. Please provide a valid email address.");
    } else {
        try {
            const existingUser = await collections.findOne({ name: data.name });
            if (existingUser) {
                 res.status(400).json({ error: "User already exists." })
            } else {
                if(passwordRegex.test(data.password)){
                    if(data.password == data.repassword){
                        const hashpassword = await bcrypt.hash(data.password,salt)
                        const usersdata = {
                            name:req.body.username,
                            password:hashpassword
                        }
                        const userdata = await collections.insertMany(usersdata);
                        res.status(200).json({ success: "Successfull" })
                        
                    }
                    else{
                        res.status(400).json({ error: "Passwords don't match" })
                    }
                }
                else{
                    res.status(400).json({ error: "Password doesn't meet the criteria" })
                }
            }
        } catch (error) {
            res.status(500).send("Error in registration.");
        }
    }
});

app.use(express.static(path.join(__dirname, 'pokemondashboard')));
app.post("/login", async (req, res) => {
    try {
        const check = await collections.findOne({ name: req.body.username });
        if (!check) {
            res.status(400).send("User not found, create an account");
        } else {
            userDeatils = req.body.username ;
            // const isPasswordMatch = (req.body.password === check.password);
            const isPasswordMatch = await bcrypt.compare(req.body.password,check.password)
            if (isPasswordMatch) {
                
                res.status(200).json({ success: "Successfull" })
                // res.sendFile(path.join(__dirname, 'pokemondashboard', 'index.html'));

            } else {
                res.status(400).send({error:"Incorrect password"});
            }
        }
    } catch (error) {
        res.status(500).send("Error during login.");
    }
});

app.get("/user", (req, res) => {
    res.json({ userDeatils });
});

app.post("/user/:username/addpokemon/:pokemonID",async(req,res)=>{
    const {username,pokemonID} = req.params;
    const { pokemonSet } = req.body;
    try{
        const user = await pokemon.findOne({username})
        if (!user) {
            const newUser = new pokemon({
                username: username,
                pokemonData: [pokemonSet]
            });
            await newUser.save();
            res.status(200).json({ message: "New user created with Pokémon set" });
          }
         else{
            const pokemonExists = user.pokemonData.some(p => {
                const idAsString = p.id.toString();
                
                return idAsString === pokemonID;
            });
            
             
            if(pokemonExists){
                res.status(400).json({ message: "Pokémon set already exists for this user" });
            }
            else{
              
              user.pokemonData.push(pokemonSet)
              
                await user.save();
                
                res.status(200).json({ message: "Pokémon set added to existing user" });
                
            }
         }
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
})
app.delete("/user/:username/removepokemon/:pokemonData", async (req, res) => {
    const { username, pokemonData } = req.params;
    try {
        const user = await pokemon.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            const parsedPokemonData = parseInt(pokemonData); // Assuming pokemonData is an ID in string format
            user.pokemonData = user.pokemonData.filter((item) => {
                return item.id !== parsedPokemonData;
            });
            await user.save();
            res.status(200).json({ message: "Pokémon set removed successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/user/:username" ,async(req,res)=>{
    const {username} = req.params

    try{
        const user = await pokemon.findOne({username}).populate('pokemonData')
        res.json(user.pokemonData)
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
})
app.get("/getLikedPokemon/:username", async(req,res)=>{
    const {username} = req.params
    console.log(username,"username in liked pokemon")
    try {
        const likedPokemonList = await pokemon.find({ username });
        res.json(likedPokemonList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
