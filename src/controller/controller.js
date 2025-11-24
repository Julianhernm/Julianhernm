

const home = (req, res)=>{
    res.send("hola mundo");
};

const home2 = (req, res)=>{
    res.send("esto es un ejemplo")
}

module.exports = {
    home,
    home2
}