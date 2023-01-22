

var assignSchema = require('./films.model').assignSchema;
var filmSchema = require('./films.model').filmSchema;
var filmRightSchema = require('./films.model').filmRightSchema;
var fs = require('fs');
var mongoose = require('mongoose');


module.exports = {
    getAssign,
    createAssign,
    createFilm,
    searchClient
}

function createAssign(data, callback){
    // console.log("-<data>-", data);
    // var data = {
    //     sender_id: data.sender_id,
    //     receiver_id: data.receiver_id,
    //     message: data.message
    // }

    console.log("-<tourData>-", data);

    var assign = new assignSchema({
        nameOfAssignor: data.nameOfAssignor,
        nameOfAssignee: data.nameOfAssignee,
        accountType: data.accountType,
        dateOfAgreement: data.dateOfAgreement
    });

    console.log("-<assign>-", assign);

    assign.save((err, doc)=>{
        if(doc){
            callback({
                code: 200,
                msg: 'data saved Successfully',
                data: doc
            })
        }
        else{
            console.log("err->", err);
            callback({
                code: 400,
                msg: 'Somthing went wrong.'+err
            })    
        }
        
    })

//     assignSchema.find({},(err, doc)=>{
//         if(doc){
//             callback({
//                 code: 200,
//                 msg: 'mesg Post Successfully',
//                 data: doc
//             })
//         }
//         else{
//             console.log("err->", err);
//             callback({
//                 code: 400,
//                 msg: 'Somthing went wrong.'
//             })    
//         }
//    })
}

function getAssign(data, callback){

    console.log("-<tourData>-", data);

    assignSchema.find({},(err, doc)=>{
        if(doc){
            callback({
                code: 200,
                msg: 'data get Successfully',
                data: doc
            })
        }
        else{
            console.log("err->", err);
            callback({
                code: 400,
                msg: 'Somthing went wrong.'+err
            })    
        }
        
    })
    
}

// ==============================================================================================================

function createFilm(data, callback){
    console.log("-<data>-", data);

    var filmInstance = new filmSchema({
        assign_id: data.assign_id,
        nameOfFilm: data.nameOfFilm,
        language: data.language,
        version: data.version,
        yearOfRelease: data.yearOfRelease,
        director: data.director,
        censerGrade: data.censerGrade,
        proBanner: data.proBanner,
        producer: data.producer,
        starCast: data.starCast,
        mDirector: data.mDirector
    });

    console.log("-<filmInstance>-", filmInstance);

    filmInstance.save((err, doc)=>{
        if(doc){

            let filmRights = data.fRights.map(item=>({...item, film_id: doc._id}));
            console.log("=filmRights=>",filmRights);
            filmRightSchema.insertMany(filmRights, (err, docs)=>{
                console.log("=err==>", err);
                console.log("=docs==>", docs);

                callback({
                    code: 200,
                    msg: 'data saved Successfully',
                    data: doc
                })
            })
        }
        else{
            console.log("err->", err);
            callback({
                code: 400,
                msg: 'Somthing went wrong.'+err
            })    
        }
        
    })
}

// ===============================================================================================================

function searchClient(data, callback){

    let dumData = [{name: "Zee"}, {name: "Sub"}, {name: "Star"}]

    console.log("-<tourData>-", data);

    let dataList = dumData.filter(e=>e.name.toLowerCase().substring(0, data.keys.length)==data.keys.toLowerCase());
    // assignSchema.find({},(err, doc)=>{
    //     if(doc){
            callback({
                code: 200,
                msg: 'data get Successfully',
                data: dataList
            })
    //     }
    //     else{
    //         console.log("err->", err);
    //         callback({
    //             code: 400,
    //             msg: 'Somthing went wrong.'+err
    //         })    
    //     }
        
    // })
    
}