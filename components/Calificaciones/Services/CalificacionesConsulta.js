const dal = require("../CalificacionesDAL");

module.exports = async ({placeId}, res) => 
{
    console.log(placeId+" asd");
    let status = 200;
    const consulta = await dal.findAll({
        where: {
            placeId:placeId
        }
        
    });
    res.status(status).json(consulta);
};