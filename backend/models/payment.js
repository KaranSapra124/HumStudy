const mongoose=require("mongoose")

const schema =new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
      
    },
    payer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        ,required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paidAt: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Single', 'Installment'],
        
      }  

   
})

const Payment =mongoose.model("Payment",schema)
module.exports=Payment