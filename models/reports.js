const mongoose = require('mongoose'); //The database used in the project ( MongoDB )
const issue = require('../db-schema/issue');


async function getAllissues(offset, limit) {
        // Database Operation: get all codes from the database
        
        console.log("ccccccccc");
        if (limit == 0) {
            limit = Number.MAX_SAFE_INTEGER;
        }
        return await issue.find({}).skip(offset).limit(limit);
        // await Code.find({})
        //     .skip(offset)
        //     .limit(limit)
        //     .then((codes) => {
        //     return codes
        // })
}
module.exports = {
    getAllissues
}