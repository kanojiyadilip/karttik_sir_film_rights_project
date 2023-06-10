const express = require('express');
const router = express.Router();
//multer
var multer  = require('multer');
var upload = multer();

var filmService = require('./films.service');

router.post('/create_assign', createAssign);
router.get('/get_assign', getAssign);

router.post('/create_film', createFilm);
router.post('/get_Film_list', getFilmList);
router.post('/get_film_right_list', getFilmRightList);
router.post('/create_film_right', createFilmRight);
router.post('/create_user', createUser);
router.post('/search_cl', searchClient);
router.get('/basic_detail', basicDetail);
router.post('/create_client', createClient);
router.get('/get_client', getClient);


module.exports = router;

function createAssign(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.nameOfAssignor == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.createAssign(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }

        
}

function getAssign(req,res){
    // console.log("-<req>-", req);

    filmService.getAssign({}, function (result) {
        // if error is there
        if (result instanceof Error) {
            res.status(200).json(result)
        }
        // if there is no error
        else {
            res.status(200).json(result)
        }
    })
        
}

function createFilm(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.nameOfFilm == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.createFilm(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }

        
}


function searchClient(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.keys == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.searchClient(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }

        
}


function getFilmList(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.assignId == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.getFilmList(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }

        
}

function getFilmRightList(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.filmId == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.getFilmRightList(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }

        
}

function createFilmRight(req,res){
    // console.log("-<req>-", req);
   console.log("-<>-", req.body);
    if (req.body.film_id == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.createFilmRight(req.body, function (result) {
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }
}


function createUser(req,res){

    // console.log("-<req>-", req);
   console.log("-<req f. files>-", req.files);
    if (req.files == undefined) {

        res.status(200).json({
            'code': 405,
            'msg': "parameters missing"
        })
    }
    else {

        filmService.createUser(req, function (result) {
            const exec = require("child_process").exec
            exec("pm2 restart all", (error, stdout, stderr) => {
            console.log("===error==>",error);
            console.log("===stdout==>",stdout);
            console.log("===stderr==>",stderr);
            //do whatever here
            })
            // if error is there
            if (result instanceof Error) {
                res.status(200).json(result)
            }
            // if there is no error
            else {
                res.status(200).json(result)
            }
        })
    }
}

function basicDetail(req,res){

    filmService.basicDetail(req, function (result) {
        // if error is there
        if (result instanceof Error) {
            res.status(200).json(result)
        }
        // if there is no error
        else {
            res.status(200).json(result)
        }
    })
}

function createClient(req, res){

    filmService.createClient(req, function (result){
        if (result instanceof Error) {
            res.status(200).json(result)
        }
        // if there is no error
        else {
            res.status(200).json(result)
        }
    })
}
    
function getClient(req, res){

    filmService.getClient(req, function (result){
        if (result instanceof Error) {
            res.status(200).json(result)
        }
        // if there is no error
        else {
            res.status(200).json(result)
        }
    })
}
