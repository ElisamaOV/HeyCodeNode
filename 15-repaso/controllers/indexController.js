class IndexControllers{
    home = (req, res) => {
        res.render("index")
    }
    
}
module.exports = new IndexControllers();