const express = require('express')
var cors = require('cors');
const app = express()
const port = 3000;
const endpoint = "/chunks/bool/1";
app.use(cors());
app.get(endpoint + "/:id", (req, res)=>{
    res.status(200).json({ body : {isTrue : true, id : -1} }).end();
})
app.get(endpoint, (req, res)=>{
    res.status(200).json({ body : [true, false, true] }).end();
})
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})