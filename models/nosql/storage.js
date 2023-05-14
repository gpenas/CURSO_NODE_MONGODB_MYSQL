const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const StorageScheme = new mongoose.Schema(
    {
        url:{ 
            type: String,
        },
        filename:{ 
            type: String,
        }
    },
    {
        //campos de auditoria createAt, updateAt
        timestamps: true,
        versionKey: false
    }
);

StorageScheme.plugin(mongooseDelete, {overrideMethods:'all'});
module.exports = mongoose.model("storages", StorageScheme)