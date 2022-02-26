//By Team
const mongoose = require("mongoose");
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);
const orderSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        customerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        customerName:{
            type:String,
            required:true,
        },
        customerPhoneNumber:{
            type:Number,
            required:true,
        }
        ,
        shippingAddress: {
            country:{
                type:string,
                required: true 
            },
            city:{
                type:String,
                required: true
            },
            street:{
                type:String,
                required: true
            },
            building:{
                type:String,
                required: true
            },

        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        orderStatus:
        {   
            type: {
                type: String,
                enum: ["pending", "packed", "shipped", "delivered", "cancelled"],
                default: "pending",
            },
            date: {
                type: Date,
            }
        },
        totalPrice: {
            type: Number,
            required: true,
          }, 
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "cancelled", "refund"],
            required: true,
          },
        paymentType:{
            type:String,
            enum:["cod", "card"],
            required: true,
        }  
    },
 

    { timestamps: true }
);
schema.plugin(autoIncrement.plugin, 'order');
module.exports = mongoose.model("order", orderSchema);
