

var assignSchema = require('./films.model').assignSchema;
var filmSchema = require('./films.model').filmSchema;
var filmRightSchema = require('./films.model').filmRightSchema;
var fs = require('fs');
var mongoose = require('mongoose');


module.exports = {
    getAssign,
    createAssign,
    createFilm,
    getFilmList,
    getFilmRightList,
    searchClient,
    createFilmRight
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

    if(data.film_id){
        filmSchema.findById(data.film_id, (err, doc)=>{
            if(doc){
                // doc.assign_id = data.assign_id;
                doc.nameOfFilm = data.nameOfFilm;
                doc.language = data.language;
                doc.version = data.version;
                doc.yearOfRelease = data.yearOfRelease;
                doc.director = data.director;
                doc.censerGrade = data.censerGrade;
                doc.proBanner = data.proBanner;
                doc.producer = data.producer;
                doc.starCast = data.starCast;
                doc.mDirector = data.mDirector;
                doc.save((err, updateDoc)=>{
                    console.log("====updateDoc====>",updateDoc);
                    if(updateDoc){
                        callback({
                            code: 200,
                            msg: 'data updated Successfully',
                            data: doc
                        })
                    // })
                    }
                    else{
                        console.log("-update-err->", err);
                        callback({
                            code: 400,
                            msg: 'Somthing went wrong.'+err
                        })    
                    }
                })
            }
        })
    }
    else{

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

                // let filmRights = data.fRights.map(item=>({...item, film_id: doc._id}));
                // console.log("=filmRights=>",filmRights);
                // filmRightSchema.insertMany(filmRights, (err, docs)=>{
                //     console.log("=err==>", err);
                //     console.log("=docs==>", docs);

                    callback({
                        code: 200,
                        msg: 'data saved Successfully',
                        data: doc
                    })
                // })
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
}

function getFilmList(data, callback){

    console.log("-<tourData>-", data);

    filmSchema.find({assign_id: data.assignId},(err, doc)=>{
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

function getFilmRightList(data, callback){

    console.log("-<tourData>-", data);

    filmRightSchema.find({film_id: data.filmId},(err, filmRightDoc)=>{
        if(filmRightDoc){
            filmSchema.findById(data.filmId,(err, filmDoc)=>{
                if(filmDoc){
                    callback({
                        code: 200,
                        msg: 'data get Successfully',
                        data: {film: filmDoc, filmRight: filmRightDoc}
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
        else{
            console.log("err->", err);
            callback({
                code: 400,
                msg: 'Somthing went wrong.'+err
            })    
        }
        
    })
    
}

function createFilmRight(data, callback){
    let lng  = data.language.map((item)=>item.item_id);
    let exlng  = data.exlLanguage.map((item)=>item.item_id);
    if(data.film_right_id){

        filmRightSchema.findOne({"_id": mongoose.Types.ObjectId(data.film_right_id), "category": data.category}, (err, doc)=>{
            if(doc){
            
                doc.subCategory = data.subCategory;
                doc.natureOfRight = data.natureOfRight;
                doc.deliveryTcqc = data.deliveryTcqc;
                doc.language = lng;
                doc.exlLanguage = exlng;
                doc.commencement = data.commencement;
                doc.expiry = data.expiry;
                doc.territories = data.territories;
                doc.exclTerritories = data.exclTerritories;
                doc.noOfRuns = data.noOfRuns;
                doc.save((err, updateDoc)=>{
                    console.log("====updateDoc====>",updateDoc);
                    if(updateDoc){
                        callback({
                            code: 200,
                            msg: 'data updated Successfully',
                            data: doc
                        })
                    // })
                    }
                    else{
                        console.log("-update-err->", err);
                        callback({
                            code: 400,
                            msg: 'Somthing went wrong.'+err
                        })    
                    }
                })
            }
        })
    }
    else{
        console.log("-<data>-", data);
        // let lng  = data.language.map((item)=>item.item_id);
        // let exlng  = data.exlLanguage.map((item)=>item.item_id);
        var filmRightInstance = new filmRightSchema({
            film_id: data.film_id,
            category: data.category,
            subCategory: data.subCategory,
            natureOfRight: data.natureOfRight,
            deliveryTcqc: data.deliveryTcqc,
            language: lng,
            exlLanguage: exlng,
            commencement: data.commencement,
            expiry: data.expiry,
            territories: data.territories,
            exclTerritories: data.exclTerritories,
            noOfRuns: data.noOfRuns
        });

        console.log("-<filmRightInstance>-", filmRightInstance);

        filmRightInstance.save((err, doc)=>{
            if(doc){

                // let filmRights = data.fRights.map(item=>({...item, film_id: doc._id}));
                // console.log("=filmRights=>",filmRights);
                // filmRightSchema.insertMany(filmRights, (err, docs)=>{
                //     console.log("=err==>", err);
                //     console.log("=docs==>", docs);

                    callback({
                        code: 200,
                        msg: 'data saved Successfully',
                        data: doc
                    })
                // })
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