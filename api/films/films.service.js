

var assignSchema = require('./films.model').assignSchema;
var filmSchema = require('./films.model').filmSchema;
var filmRightSchema = require('./films.model').filmRightSchema;
var fs = require('fs');
var mongoose = require('mongoose');
var csvtojson = require('csvtojson');
const exec = require("child_process").exec


module.exports = {
    getAssign,
    createAssign,
    createFilm,
    getFilmList,
    getFilmRightList,
    searchClient,
    createFilmRight,
    createUser,
    basicDetail
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
        if(data.natureOfRight == 'Exclusive'){
            console.log("-<data>-", data);
            // let lng  = data.language.map((item)=>item.item_id);
            // let exlng  = data.exlLanguage.map((item)=>item.item_id);
            let category = String(data.category);
            filmRightSchema.aggregate([
                { 
                    $match: {
                        film_id: mongoose.Types.ObjectId(data.film_id), 
                        category: category,
                        subCategory: data.subCategory,
                        natureOfRight: "Exclusive", 
                        // expiry: { $lte: new Date() }
                        // expiry: { $gte: new Date(data.commencement) },
                        expiry: { $gte: new Date(data.commencement) },
                        language: {"$in":lng},
                        territories: {"$in":data.territories}
                    }
                }, 
                {$lookup: {from: "films", localField: "film_id", foreignField:"_id", as:"join"}},
                {$unwind: "$join"},
                // {$project: { "join.assign_id":1 }},
                {$lookup: {from: "assigns", localField: "join.assign_id", foreignField:"_id", as:"nextjoin"}},
                {$unwind: "$nextjoin"},
                {$match: { "nextjoin.accountType":"1" }}
                
                ], (err, doc)=>{
                    console.log("==err===>", err);
                    console.log("==doc===>", doc);
            // filmRightSchema.findOne({"film_id": mongoose.Types.ObjectId(data.film_id), natureOfRight: "Exclusive", expiry: { $gte: new Date() }}, (err, doc)=>{
                if(doc.length){
                    var langMatch = [];
                    var terrMatch = [];
                    for(var i=0; i<doc.length; i++){

                        lng.forEach(item=>{
                            let obj = doc[i].language.find(e=>e==item) || {};
                            if(Object.keys(obj).length){
                                langMatch.push(obj);
                            }
                        });
                        data.territories.forEach(item=>{
                            let obj = doc[i].territories.find(e=>e==item) || {};
                            if(Object.keys(obj).length){
                                terrMatch.push(obj);
                            }
                        });
                    }

                    if(langMatch.length > 0 && terrMatch.length > 0){
                        callback({
                            code: 420,
                            msg: 'This already sale to '+doc[0].nextjoin['nameOfAssignee']+' now you have to wait for expiry'
                        }) 
                    }
                    else{
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
                
                        console.log("-<filmRightInstance>-1-", filmRightInstance);
                
                        filmRightInstance.save((err, doc)=>{
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
                    }     
                }
                else{

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
            
                    console.log("-<filmRightInstance>-2-", filmRightInstance);
            
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
            })
        }
        else{

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
    
            // console.log("-<filmRightInstance>-", filmRightInstance);
    
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
}

// ===============================================================================================================

function searchClient(data, callback){

    let userList = require('../../public/uploads/users.json');
    // console.log("----userList----->", userList);

    // let dumData = [{name: "Zee"}, {name: "Sub"}, {name: "Star"}]

    // console.log("-<tourData>-", data);

    let dataList = userList.filter(e=>e.name.toLowerCase().substring(0, data.keys.length)==data.keys.toLowerCase());
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


var fs = require('fs');

function createUser(req, callback){

    console.log("-<tourData>-", req);

    var obj = req.files; 
    console.log("===obj====>",obj);
    //   req.on(data=>{
    //     console.log("==data===>", data);  
    //     var csvData = req.data.toString('utf8');
    //     return csvtojson().fromString(csvData).then(json =>{
    //       console.log("==json=1==>", json);
    //     })
    //   })
    console.log("==obj.usersListCsv.data===>", obj.usersListCsv.data);
        var csvData = obj.usersListCsv.data.toString('utf8');
        console.log("==csvData===>", csvData);
        return csvtojson().fromString(csvData).then(json =>{
        console.log("==json===>", typeof json);

        var stream = fs.createWriteStream("public/uploads/users.json");
        stream.once('open', (fd)=>{
            stream.write(JSON.stringify(json));
            stream.end();
            // exec("ls", (error, stdout, stderr) => {})
            callback({
                code: 200,
                msg: 'data saved Successfully',
                data: json
            })
        })

    })
}

function basicDetail(data, callback){

    let list = require('../../public/uploads/languages.json');

    callback({
        code: 200,
        msg: 'data get Successfully',
        data: {languages: list}
    })
    
}