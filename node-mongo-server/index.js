
// step 1 

const express = require ('express')

// step 3 
const cors = require('cors');

// MongoClient

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

// step 2
const app = express();

// step 4
app.use(cors());
app.use(express.json());

// step 5
const port = 5000;


// Replace the uri string with your MongoDB deployment's connection string.

const uri = 
"mongodb+srv://userdb1:byu2bJeDXfUFl4fT@cluster0.4t39k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   console.log('database testing ok ');
// //   // perform actions on the collection object
// // //   client.close();
// // });


async function run() {
  try {
    await client.connect();

    const database = client.db('foodMaster');
    const usersCollection = database.collection('users');


// Get API 

app.get('/users', async(req,res)=>{

  const cursor = usersCollection.find({});
  const users = await cursor.toArray();
  res.send(users);
});


//    Post API

    app.post('/users',async(req,res)=>{
        const newUser = req.body;
        const result =  await usersCollection.insertOne(newUser)
        console.log('got new user',req.body);
        console.log('added new suer',result);
        res.json(result);
        
    });

    app.delete('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = usersCollection.deleteOne(query);
        console.log('deleteing user with id',result)
        res.json(result);


    })




    // const doc = { name: 'md moin ',email:'sub.moinuddin@gmail.com' };
    // const result = await usersCollection.insertOne(doc);

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('runing my app')
})

app.listen(port,()=> {
    console.log('runing server port',port)
})