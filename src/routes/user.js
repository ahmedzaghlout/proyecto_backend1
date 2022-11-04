const router = require("express").Router;
const User = require("../models/user");
const route = router();

// crear usuario
route.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json({
        message:"usuario creado"
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });

// leer usuarios
  route.get("/", async (req, res) => {
    try {
      
      const users = await User.find({}).lean();
     
      res.status(200).json({
        users,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });

// leer usuario unico
route.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
// eliminar usuario
route.delete("/:id", async (req, res) => {
    try {
     
      await User.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json("usuario eliminado");
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
// update usuario
route.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = route;