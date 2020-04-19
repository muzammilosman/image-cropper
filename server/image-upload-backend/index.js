const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const multer = require('multer')
const fs = require('fs-extra')
var uploads = multer({
    dest: './uploads'
})

const app = express()

// app.use(express)
app.use(bodyParser.json())
app.use('/uploads', express.static(__dirname + '/uploads'));

var originsWhitelist = ['http://localhost:4200'];
var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:false
}

app.use(cors(corsOptions))

app.post('/upload', uploads.array('cropImage',4),(req, res) => {
    
    console.log("Uploaded file:", req.files)
    res.json({
        success: true,
        files: req.files
    })
})


app.get('/gallery',(req, res) => {
    fs.readdir(('./uploads'),(err,data) => {
        if(err) {
            console.log(err)
        } else {
            let filePath = []
            data.forEach(el => {
                filePath.push('http://localhost:3000/uploads/' + el)
            })
            res.json({
                files: filePath
            })
        }
        
    })
})

app.listen(3000, () => {
    console.log('Server started on port:', 3000)
})