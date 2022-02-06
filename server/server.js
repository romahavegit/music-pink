const express = require('express')
var cors = require('cors');
const app = express()
const port = 3000;
const endpoint = "/chunks/bool/1";
app.use(cors());
app.get(endpoint + "/:id", (req, res)=>{
    res.status(200).json({ body : {isTrue : false, id : req.params.id} }).end();
})
app.get(endpoint, (req, res)=>{
    res.status(200).json({ body : [false, false, false, false, false] }).end();
})
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})