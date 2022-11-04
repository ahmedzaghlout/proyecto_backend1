const router = require("express").Router;
const route = router();
const Tweet = require("../models/tweet");
const like = require("../models/like");
const tweet = require("../models/tweet");

// crear tweet 
route.post("/", async (req, res) => {
    try {
      const tweet = await Tweet.create(req.body);
      res.status(200).json({
        message:"tweet creado"
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// leet todos los tweets
  route.get("/todos", async (req, res) => {
    try {
      
      const tweet = await Tweet.find({}).lean();
     
      res.status(200).json({
        tweet,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// leer tweets de un usuario
route.get("/:id", async (req, res) => {
    try {
      const tweet = await Tweet.find({ owner_id: req.params.id });
      res.status(200).json({ tweet });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });

  // eliminar tweet
  route.delete("/:id", async (req, res) => {
    try {
     
      await Tweet.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json("tweet eliminado");
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// update tweet
route.patch("/:id", async (req, res) => {
    try {
 
    const filter = { _id: req.params.id };
 
    const options = { upsert: true };
 
    const updateDoc = {
      $set: {
        body: req.body.body
      },
    };
      await Tweet.updateOne(filter,options,updateDoc);
      return res.status(200).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// dar like 
route.post("/like", async (req, res) => {
    try {
      const { owner_id, tweet_id } = req.body;
      const isFollowing = await like.exists({
        owner_id: owner_id ,
        tweet_id: tweet_id,
      });
  
      if (isFollowing) {
        return res.status(408).json({
          message: "ya tiene me gusta",
        });
      }
      await like.create({
        owner_id: owner_id ,
        tweet_id: tweet_id,
      });
  
      return res.status(200).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// muestra todos los like 
route.get("/like/todos", async (req, res) => {
    try {
      
      const tweet = await like.find({}).lean();
     
      res.status(200).json({
        tweet,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// likes de un usuario
route.get("/likes/:id", async (req, res) => {
    try {
      const   id  = req.params.id;
      const likes = await like.find({ owner_id: id }).lean();
      res.status(200).json({likes });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// quitar like 
route.delete("/like/:id", async (req, res) => {
    try {
      await like.deleteOne({
        _id:req.params.id
      });
      res.status(200).json({message:"se ha quitado el like "});
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
 




module.exports = route;