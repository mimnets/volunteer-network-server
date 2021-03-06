const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const ObjectID = require('mongodb').ObjectID;


const app = express()
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ak6zw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 3001

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const volunteerCollections = client.db('volunteerNetwork').collection('volunteerServices');
  const usersCollections = client.db('volunteerNetwork').collection('users');
  const activitiesCollections = client.db('volunteerNetwork').collection('activites'); 
  // perform actions on the collection object
    app.get("/home", (req, res) => {
        volunteerCollections.find({})
        .toArray((err, documents) =>{
            // console.log(documents);
            // res.send('data base connected');
            res.send(documents)
        })
    })

    app.get("/vservice/:id", (req, res) => {
      volunteerCollections.find({_id: ObjectID(req.params.id)})
      .toArray((err, documents) =>{
        res.send(documents[0]);
      })
    })

    app.get("/events", (req, res) => {
      usersCollections.find({})
      .toArray((err, documents) =>{
        res.send(documents);
      })
    })

    // app.get("/events", (req, res) => {
    //   const bearer = req.headers.authorization;
    //   if(bearer && bearer.startsWith('Bearer ')){
    //     const idToken = bearer.split(' ')[1];
    //     console.log(idToken);
    //     admin.auth().verifyIdToken(idToken)
    //     .then(function(decodedToken) {
    //       const tokenEmail = decodedToken.email;
    //       const queryEmail = request.query.email;
    //       if(tokenEmail == queryEmail) {
    //         usersCollections.find({email: req.query.email})
    //         .toArray((err, documents) =>{
    //           res.send(documents);
    //         })
    //       }
    //     }).catch(function(err){

    //     });
    //   }
    // })

    app.post("/addUser", (req, res) =>{
      const user = req.body;
      usersCollections.insertOne(user)
      .then(result =>{
        // console.log('register successfully')
        res.send(result.insertedCount > 0);
      })
    })

    app.delete("/delete/:id", (req, res) =>{
      // console.log(req.params.id);
      usersCollections.deleteOne({_id: req.params.id})
      .then(result =>{
        res.send(result);
      })
    })

});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)
