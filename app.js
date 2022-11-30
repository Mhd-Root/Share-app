import express from 'express'
import _ from 'lodash'
import auth from 'http-auth'
import authConnect from 'http-auth-connect'
import ejs from 'ejs'
const app = express()

app.use(express.static("./static"));
app.use(express.static("./views"));
app.use(express.json())

var proto = auth.basic({
        realm: "Hi, here is my share space you cannot access here :) !"
    }, function (username, password, callback) {
        callback(username === "SH4r3sp4c3" && password === "1tsMYSh4r3h3r3");
    }
);

app.post('/', authConnect(proto));
app.get('/', authConnect(proto));

app.get('/',function(req,res) {
  res.render('index.ejs');
});


let user = {
    username: 'user',
    robot: false,
    bday: '2000.01.01'
}

app.post('/', (req, res) => {
    console.log('Data:', req.body )
    let defaults = {
        a: 0,
        b: 0,
        c: 0
    }
    _.merge( defaults, req.body )
    let {a,b,c} = defaults
    return res.send(`${a+b+c}`)
})

app.get('/admin', (req, res) => {
    if (!user.ImTh3b3sTH4ck3r) {
        console.log('Access denied.')
        return res.sendStatus(403)
    }
    console.log('Access allowed.')
