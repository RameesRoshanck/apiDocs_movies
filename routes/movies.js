const express=require("express")
const router=express.Router()
const nanoid = require("nanoid").default;


const idLength = 8;


/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - director
 *         - releaseDate
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generate id of the movie
 *         title:
 *           type: string
 *           description: The movie title
 *         director:
 *           type: string
 *           description: The movie director
 *         releaseDate:
 *           type: Date
 *           description: The movie releaseDate 
 *         rating:
 *           type: string
 *           description: The movie rating 
 *       example:
 *         id: 12345671
 *         title: The Lion King
 *         director: Francis Ford Coppola
 *         releaseDate: 2023-03-24
 *         rating: 9.2
 */

 /**
  * @swagger
  * tags:
  *   name: Movie
  *   description: The New Movies managing API
  */

 /**
 * @swagger
 * /movies:
 *   get:
 *     summary: Returns the list of Such of new Movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the Movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get("/",(req,res)=>{
    const movies=req.app.db.get("movies")
    res.send(movies)
})



/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Movie id
 *     responses:
 *       200:
 *         description: The movie description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie was not found
 */


router.get("/:id",(req,res)=>{
    const movie=req.app.db.get("movies").find({id:req.params.id}).value()
    if(!movie){
        res.sendStatus(404)
    }
    res.send(movie)
})



/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new book
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The Movie Details was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Some server error
 */

router.post("/",(req,res)=>{
   try{
      const movie={
        id: nanoid(idLength),
        ...req.body
      }
      req.app.db.get("movies").push(movie).write()
      resres.status(200).send(movie)
   }catch(error){
    return res.status(500).send(error)
   }
})



/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: Update the movie by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: The Movie details was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      404:
 *        description: The movie was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id",(req,res)=>{
    try{
       req.app.db.get("movies").find({id:req.params.id}).assing(req.body).write()
       
       res.status(200).send(req.app.db.get("movies").find({id:req.params.id}))

    }catch(error){
     return res.status(500).send(error)
    }
 })


 /**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Remove the Movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 * 
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */


 router.delete("/:id",(req,res)=>{
    try{
       req.app.db.get("movies").remove({id:req.params.id}).write()
       
       res.sendStatus(200)
       
    }catch(error){
     return res.status(500).send(error)
    }
 })


 module.exports = router;