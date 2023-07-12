
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

const app=express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://127.0.0.1/MiniProject')
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Could not connect to mongoose...", err));



  const router = express.Router();

  // Parse JSON and URL-encoded bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  const formDataSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  });


const user=mongoose.model("Doners",formDataSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/AllHtml/Lighthouse.html");
});


 
app.post('/login', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await client.connect();
    const db = client.db('MiniProject');
    const usersCollection = db.collection('doners');

    const user = await usersCollection.findOne({ email, password });

    if (user) {
      console.log("successfully login");
      res.sendFile(__dirname + '/AllHtml/Lighthouse.html');
      
    } else {
      res.sendFile(__dirname + '/public/Registration.html');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  } finally {
    await client.close();
  }

});


app.post("/Registration", (req, res) => {
    const formData = req.body;
    const newUser = new user({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  
    newUser.save();
    console.log(formData.name);
      console.log(formData.password);
    console.log("successfully entered....");
    res.sendFile(__dirname +"/AllHtml/Lighthouse.html");
  });
  
    
 


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });