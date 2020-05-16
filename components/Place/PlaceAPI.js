/**
 * Rutas de Lugares
 */
// Libs
const express = require("express");
const cors = require("cors");
const services = require("./Services");
const lugaresDB = require("./PlaceDAL");



const Place = express.Router();
const middleware = require("../Middleware");
Place.use(express.urlencoded({ extended: false }));
Place.use(express.json());
Place.use(cors());



const lugares = [];
lugaresDB.findAll(
  {attributes: ['name', 'image', 'lat', 'lon', 'description']}
).then(projects => {
  for(var i=0;i<projects.length;i++)
    lugares.push(projects[i].dataValues);
})

Place.get("/", (req, res) =>{
    const response={
      data: [],
      message: []  
    }
    let statusCode = null;
    const {search}= req.query;
    if(search && search.trim()){
        //filtrar en el JSON
        response.data=lugares.filter(lugar =>{
            //si retorna true
            return lugar.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        });
        statusCode=200;
    }else{
        //ENVIAR TODO LOS REGISTROS(JSON)
        response.data=lugares;
        statusCode=200;
    }
    res.status(statusCode).send(response);
});

Place.post("/", middleware, (req, res) => {
  services.create(req.body, res);
});

Place.put("/", (req, res) => {
  res.status(200).json({
    message: "Metodo put"
  });
});

Place.delete("/", (req, res) => {
  res.status(200).json({
    message: "Metodo delete"
  });
});

module.exports = Place;
