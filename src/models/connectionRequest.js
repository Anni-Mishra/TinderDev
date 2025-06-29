const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    },
},
{
    timestamps: true,
}
);
 


connectionRequestSchema.pre('save', function (next) {
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error ("Cannot send connection request to self!");
    }

    next();
});


const connectionRequestSchemaModel = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequestSchemaModel;
