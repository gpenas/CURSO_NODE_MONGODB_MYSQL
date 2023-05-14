const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema(
    {
        name:{ 
            type: String,
        },
        age:{ 
            type: Number,
        },
        email:{ 
            type: String, 
            unique: true,
        },
        password:{ 
            type: String,
            select: false
        },
        roles:{ 
            type: ["user", "admin"], 
            default: "user",
        }
    },
    {
        //campos de auditoria createAt, updateAt
        timestamps: true,
        versionKey: false
    }
);
UserScheme.plugin(mongooseDelete, {overrideMethods:'all'});
module.exports = mongoose.model("users", UserScheme)