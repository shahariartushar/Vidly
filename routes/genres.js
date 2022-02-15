const Joi = require('joi');
const express = require('express');
const router = express.Router();

//genres
const genres =[
    { id: 1, name: 'Action'},
    { id: 2, name: 'Comedy'},
    { id: 3, name: 'Drama'},
    { id: 4, name: 'Fantasy'},
    { id: 5, name: 'Horror'},
    { id: 6, name: 'Mystery'},
    { id: 7, name: 'Romance'},
    { id: 8, name: 'Thriller'}
];

//get all the genres
router.get('/', (req, res) => {
    res.send(genres)
});

//get a genre by id
router.get('/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)    return res.status(404).send('Genre Id not found');
    
    res.send(genre);
});

//create a new genre
router.post('/', (req, res)=>{
    const {error} = validateCourse(req.body);
    if(error)   return  res.status(400).send(error.details[0].message);

    const genre =  {
        id: genres.length + 1,
        name: req.body.name

    };
    genres.push(genre);
    
    res.send(genre);
});

//update a genre by id
router.put('/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)    return res.status(404).send('Genre Id not found');

    const {error} = validateCourse(req.body);
    if(error)   return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    
    res.send(genre);
});

// delete a genre by id
router.delete('/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)    return res.status(404).send('Genre Id not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

// validate genre
function validateCourse(genre){
    const schema = {
        name: Joi.string().min(3).required() // name should have 3 character
    };
    
    return  Joi.validate(genre, schema);
}

module.exports = router;

