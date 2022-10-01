var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(bodyParser.json())
//app.use(express.static('public'))
//app.use(bodyParser.urlencoded({
//extended:true
//}))

mongoose.connect('mongodb+srv://user123:userpass123@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log('Error in DB connection : ' + err);
    }
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/appointment", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var appointment_date = req.body.appointment_date;
    var morning_desired = req.body.morning_desired;
    var evening_desired = req.body.evening_desired;
    var confirm_by = req.body.confirm_by;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "appointment_date": appointment_date,
        "morning_desired": morning_desired,
        "evening_desired": evening_desired,
        "confirm_by": confirm_by

    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('TY_Booking.html')

})
const app1 = require('express')();
app1.get('/public/index.html', (req, res) => {
    res.redirect('/public/views/index.ejs');
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('TY_Booking.html');
}).listen(3000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Connected at server ${PORT}`)
});
