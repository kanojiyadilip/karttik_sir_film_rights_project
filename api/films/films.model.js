var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    name: {
        type: String
    },
    active:{
        type: Boolean,
        default: true
    },    
    created_timestamp: {
        type: Number,
        default: new Date().valueOf()
    },
    updated_timestamp: {
        type: Number,
        default: new Date().valueOf()
    } 
});

module.exports.clientSchema = mongoose.model('Client', clientSchema);

var assignSchema = new Schema({
    nameOfAssignor: {
        type: Schema.Types.ObjectId, 
        ref: 'Client'
    },
    nameOfAssignee: {
        type: Schema.Types.ObjectId, 
        ref: 'Client'
    },
    accountType: {
        type: String
    },
    dateOfAgreement: {
        type: Date,
        default: Date.now
    },
    active:{
        type: Boolean,
        default: true
    },    
    created_timestamp: {
        type: Number,
        default: new Date().valueOf()
    },
    updated_timestamp: {
        type: Number,
        default: new Date().valueOf()
    } 
});

module.exports.assignSchema = mongoose.model('Assign', assignSchema);

// =======================================================================================================================

var filmSchema = new Schema({
    assign_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Assign'
    },
    nameOfFilm: {
        type: String
    },
    language: [{
        type: String
    }],
    version: {
        type: String
    },
    yearOfRelease: {
        type: Date,
        default: Date.now
    },
    director: {
        type: String
    },
    censerGrade: {
        type: String
    },
    proBanner: [{
        type: String
    }],
    producer: [{
        type: String
    }],
    starCast: [{
        type: String
    }],
    mDirector: [{
        type: String
    }],
    active:{
        type: Boolean,
        default: true
    },    
    created_timestamp: {
        type: Number,
        default: new Date().valueOf()
    },
    updated_timestamp: {
        type: Number,
        default: new Date().valueOf()
    } 
});

module.exports.filmSchema = mongoose.model('Film', filmSchema);

// =======================================================================================================================

var filmRightSchema = new Schema({
    film_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Film'
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    natureOfRight: {
        type: String
    },
    deliveryTcqc: {
        type: Date,
        default: Date.now
    },
    language: [{
        type: String
    }],
    exlLanguage: [{
        type: String
    }],
    commencement: {
        type: Date,
        default: Date.now
    },
    expiry: {
        type: Date,
        default: Date.now
    },
    territories: [{
        type: String
    }],
    noOfRuns: {
        type: String
    },
    active:{
        type: Boolean,
        default: true
    },    
    created_timestamp: {
        type: Number,
        default: new Date().valueOf()
    },
    updated_timestamp: {
        type: Number,
        default: new Date().valueOf()
    } 
});

module.exports.filmRightSchema = mongoose.model('FilmRight', filmRightSchema);