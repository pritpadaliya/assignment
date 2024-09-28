const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./Database')

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/');

app.get("/" , (req,res) =>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.post("/add", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Error inserting data" });
        });
});

app.get("/getuser/:id" , (req,res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id }) 
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json({ error: 'Failed to update user' }));
  });
  

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
      .then((result) => res.json({ message: 'User deleted successfully', result }))
      .catch((err) => res.status(500).json({ error: 'Failed to delete user' }));
  });
  


app.listen(2500, () => {
    console.log("Listening...");
})