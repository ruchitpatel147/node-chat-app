const path = require('path');
const express = require('express');
const pathBuilder = path.join(__dirname,'../public');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3010;
app.use(express.static(pathBuilder),);

app.listen(port,()=>{
    console.log(`server is up on ${port}`);
});