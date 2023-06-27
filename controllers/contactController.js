const asyncHandler = require("express-async-handler");
const Contact =require("../models/contactmodel")

const getContacts = async(req, res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    return res.status(200).json({contacts});
};

const createContact = asyncHandler( async(req,res) =>{
    try {
        console.log("The requested body is:",req.body)
        const{name,phone,email}=req.body;
        if(!name||!phone||!email){
            res.status(400);
            throw new Error("All fileds are mandatory"); 
        }
        const contact = await Contact.create ({
            name,
            email,
            phone,
            user_id: req.user.id, 
        } );
        return res.status(201).json({contact});
    } catch(err) {
        console.log(err)
    }
});

const getContact = asyncHandler( async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(201).json({contact});
});

    
const updateContact = asyncHandler( async (req, res) =>{

    try {
        const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true});
        return res.status(200).json(updateContact);

        if(contact.user_id.toString!== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to update other users contacts");
             
        } 

    }
    catch (error) {

        return res.status(500).json(error);
    }
   
});
const deleteContact = asyncHandler(async(req,res) =>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other users contacts");
         
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json (contact);
});


module.exports = {getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};