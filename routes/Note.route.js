const express=require("express")
const {NoteModel}=require("../model/Note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const noteID=req.params.id
    await NoteModel.findByIdAndUpdate({_id:noteID},payload)
    res.send({"msg":`Note with id: ${noteID} has been updated`})
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID},payload)
    res.send({"msg":`Note with id: ${noteID} has been deleted`})
})

module.exports={
    noteRouter
}
