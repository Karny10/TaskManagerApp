const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Task = require("../models/Task");
const { body, validationResult } = require('express-validator');



// Route 1 : Get all tasks using : GET "/api/tasks/fetchalltasks" . LOgin required
router.get("/fetchalltasks", fetchuser,async (req,res)=>{
    try {
        const tasks = await Task.find({user: req.user.id});
        res.json(tasks)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})



// Route 2 : Add a new task using : POST "/api/tasks/addtasks" . LOgin required
router.post("/addtask", fetchuser,[body("title","Enter a vaild title").isLength({min:3}),
body("description","Description must be atleast 5 characters").isLength({min:5})
],async (req,res)=>{
    try {
    const {title, description}= req.body;
    //if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task =  new Task({
        title,description,user : req.user.id
    })
    const savedtask = await task.save()
    
    res.json(savedtask)
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
   
})

//Route 3: Update existing tasks using PUT "/api/tasks/updatetask". Login required
router.put("/updatetask/:id", fetchuser,async (req,res)=>{
    try {
        
   
const {title, description}=req.body;
//Create new tasks
const newTask = {};
if(title){
    newTask.title = title;
}
if(description){
    newTask.description = description;
}

//Find the task to be updated
let task = await Task.findById(req.params.id);
if(!task){
    return res.status(404).send("Not Found")
}
if(task.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
}
task = await Task.findByIdAndUpdate(req.params.id,{$set:newTask},{new:true})
res.json({task});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
}
})

//Route 4 : Deleting existing Task using DELETE "/api/tasks/deletetask" - Login required
router.delete("/deletetask/:id", fetchuser,async (req,res)=>{
    try {
        
  
    const {title, description}=req.body;
    //Create new tasks
  
    //Find the task to be deleted and delete it
    let task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).send("Not Found")
    }
    //All deletion 
    if(task.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndDelete(req.params.id)
    res.json({"Success": "Task has been deleted",task:task});
}catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
}
    })




module.exports = router;



