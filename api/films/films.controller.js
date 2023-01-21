const express = require('express');
const router = express.Router();

var filmService = require('./films.service');

router.post('/create_assign', createAssign);
router.get('/get_assign', getAssign);

router.post('/create_film', createFilm);

module.exports = router;

function createAssign(req,res){
    console.log("-<req>-", req);
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
    console.log("-<req>-", req);

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