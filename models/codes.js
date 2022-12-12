const mongoose = require('mongoose'); //The database used in the project ( MongoDB )
const Code = require('../db-schema/Code');


async function getAllCodes(offset, limit) {
        // Database Operation: get all codes from the database
        
        console.log("here35");
        if (limit == 0) {
            limit = Number.MAX_SAFE_INTEGER;
        }
        return await Code.find({}).skip(offset).limit(limit);
        // await Code.find({})
        //     .skip(offset)
        //     .limit(limit)
        //     .then((codes) => {
        //     return codes
        // })
}

;
async function getCodeDetails(code_id){
    // Database Operation: get one code details from the database\
    await Code.findById(code_id, function(err, data) {
        if (err || !data) {
            console.log(err)
            return;
        }
        console.log(data);
        return data
    })
};


async function modifyCode(code_id, code){
        // Database Operation: modify code details from the database
        Code.findByIdAndUpdate(code_id, {
            brand: code.brand,
            price: code.price,
            code: code.code
        }, function(err, data) {
            if (err || !data) {
                console.log("ERROR:", err)
                return {error: err}
            }
            return data
        })
};


async function deleteCode(code_id){
        // Database Operation: delete a code  from the database
    Code.findByIdAndRemove(code_id, function(err, data) {
        if (err) {
            console.log("ERROR:", err)
            return {error: err};
        }
        return {error: false} // success!
    })
};


const addCode = async (newcode) => {
         // Database Operation: add a code to the database
    let newCode = new Code({
        brand: newcode.brand,
        price: newcode.price,
        code: newcode.code,
        image: newcode.image,
        status: newcode.status
    })
    newCode.save(function(err, data) {
        if (err || !data) {
            console.log("ERROR:", err)
            return {error: err};
        }
        return data
    })
}

module.exports = {getAllCodes, getCodeDetails, modifyCode, deleteCode, addCode}