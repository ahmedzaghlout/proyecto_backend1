const router = require("express").Router;
const route = router();

const Follow = require("../models/follow");

// leer todos los vinculos
route.get("/todos", async (req, res) => {
    try {
      
      const users = await Follow.find({}).lean();
     
      res.status(200).json({
        users,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// leer seguidos de un usuario
route.get("/seguidores", async (req, res) => {
  try {
    const  {id}  = req.query;
    const siguiendo = await Follow.find({ siguiendo_id: id });
    res.status(200).json({ users: siguiendo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});
// leer seguidores de un usuario
route.get("/seguidos", async (req, res) => {
  try {
    const   {id}  = req.query;
    const seguidores = await Follow.find({seguidor_id: id });
    res.status(200).json({ users: seguidores });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});
//crear vinculo
route.post("/", async (req, res) => {
  try {
    const { seguidor_id, siguiendo_id } = req.body;
    const isFollowing = await Follow.exists({
      seguidor_id: seguidor_id ,
      siguiendo_id: siguiendo_id,
    });

    if (isFollowing) {
      return res.status(408).json({
        message: "siguiendo al usuario ",
      });
    }
    await Follow.create({
        seguidor_id: seguidor_id ,
        siguiendo_id: siguiendo_id,
    });

    return res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});
//eliminar vinculo
route.delete("/:id", async (req, res) => {
  try {
    await Follow.deleteOne({
      _id:req.params.id
    });
    res.status(200).json({message:"ya no sigues a esta persona "});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = route;