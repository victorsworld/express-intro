const express = require("express");
const movies = require("./movies");

const app = express();
const PORT = 3000;
//get is a read
app.get("/", (req, res) => {
	res.status(200).json({ data: movies });
});
app.get("/action", (req, res) =>{
    const actionFilms = movies.filter((elem) =>{
        //includes
        //search
        return elem.Genre.includes('Action')
    });
    //console.log(actionFilms)
    res.status(200).json({ data: actionFilms })

})

//dynamic
app.get("/genre/:genreName", (req,res) => {
    //http://localhost:3000/genre/action
    //console.log(req.params); //{genreName: 'action'}
    //console.log(req.params.genreName); //action
    const genre = req.params.genreName.toLowerCase();

    const filteredByGenere = movies.filter((film) =>{
        return film.Genre.toLocaleLowerCase().includes(genre)
    })
    res.status(200).json({data: filteredByGenere })
})

app.get("/after", (req,res) =>{
    
    const filteredByYear = movies.filter((film) =>{
        return parseFloat(film.Year) >= 2010
    })
res.status(200).json({data: filteredByYear})
})

app.get("/title/:movieName", (req,res) =>{

const name = req.params.movieName.toLocaleLowerCase();

 const filteredmov = movies.filter((elem) =>{
    //explicit returns uses one word return
    return elem.Title.toLocaleLowerCase().includes(name)
 })
 res.status(200).json({ data: filteredmov });
})

app.delete("/delete-movie/:imdbID", (req,res) =>{
    //indexOf
    const imdbID = req.params.imdbID;
    //implicit return
    const findIndexOfMovie = movies.findIndex((film) => film.imdbID === imdbID);
    movies.splice(findIndexOfMovie, 1);
   // console.log(movies)
    res.status(200).json({ data: "Movie Deleted"})
    
})

app.get("/about", (req, res) => {
	res.status(200).send("from about page");
});

// Create = POST Request
// Update = PUT Request/ Patch
// Delete = DELETE request

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});

