const { MongoClient, ObjectId } = require('mongodb');

let dbConnection;

require('dotenv').config();

module.exports.connectDb = (cb) => {
    MongoClient.connect(process.env.DBURI)
    .then((client) => {
        dbConnection = client.db();
        return cb();
    })
    .catch(err => {
        console.error(err);
    })
}

module.exports.getAll = (req, res) => {
    var people = [];

    dbConnection.collection('people')
    .find()
    .forEach(person => people.push(person))
    .then(() => {
        res.status(200).json(people);
        console.log(people)
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch the docs'});
    })
}

module.exports.registerPerson = (req, res) => {
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { age } = req.body;

    dbConnection.collection('people')
    .insertOne(req.body)
    .then(result => {
        res.status(201).json(result);
        console.log(result);
    })
    .catch(err => {
        res.status(500).json({error: "Register failed"});
    })
}

module.exports.deletePerson = (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        dbConnection.collection('people')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: "Failed to delete a person"});
        })
    }else{
        res.json(500).json({error: "ID not valid"});
    }
}

module.exports.patchPerson = (req, res) => {
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)){
        dbConnection.collection('people')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: "Failed to patch a person"});
        })
    }else{
        res.json(500).json({error: "ID not valid"});
    }
}

module.exports.getDb = () => dbConnection;