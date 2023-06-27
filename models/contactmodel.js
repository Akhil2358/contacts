const mongoose =require("mongoose");

const contactSchema = mongoose.Schema({

    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },

    name:{
        type:String,
        required:[true,"please add the contact name"],
    },
    email:{
        type:String,
        require:[true,"please add the contact email"],
    },
    phone:{
        type:String,
        reuired:[true,"pleease add the contact phone number"],
    },


},{
    timestamps:true,

});

module.exports = mongoose.model("Contact",contactSchema);