const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Video = require('../models/video')

const db = "mongodb://localhost/videoplayer"
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if(err) {
        console.err("Error!" + err)
    }
})

router.get('/videos', (req, res) => {
    // res.send("API WORKS")
    console.log("Get request for all videos");
    Video.find({})
    .exec(function(err, videos) {
        if(err){
            console.log("Error retrieving the videos")
        } else {
            res.json(videos)
        }
    })
})

// To Get Sing video
router.get('/videos/:id', (req, res) => {
    console.log("Get a request sing Video")
    Video.findById(req.params.id)
    .exec(function(err, video) {
        if(err) {
            console.log("Error retriving the video")
        } else {
            res.json(video)
        }
    })
})

//POST request method
router.post('/video', function (req, res)  {
   console.log("Post a Video")
   var newVideo = new Video();
     
   newVideo.title = req.body.title;
   newVideo.url = req.body.url;
   newVideo.description = req.body.description;
   newVideo.save(function(err, insertedVideo) {
       if(err) {
           console.log("Error saving the video");
       } else {
           res.json(insertedVideo)
       }
   })
})

//PUT method
router.put('/video/:id', (req, res) => {
   console.log("Update a Video")
   Video.findByIdAndUpdate(req.params.id,
    {
        $set:{title:req.body.title, url:req.body.url, description:req.body.description}
    },
    {
        new : true
    },
    function(err, updatedVideo) {
        if(err){
            console.log("Error updating Video")
        } else {
            res.json(updatedVideo)
        }
    }
   )
})

// DELETE Method
router.delete('/video/:id', (req, res) => {
    console.log("Delete a Video");
    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
        if(err) {
            console.log("Deleting a Video")
        } else {
            res.json(deletedVideo)
        }
    })
})

module.exports =router