const express = require("express")
const axios= require("axios")
const app = express()
const cors = require('cors');
app.use(cors());
app.get('/ip/:ip', async (req, res) => {
    console.log("arrive")
    let ip = req.params.ip;
    console.log(req.socket.remoteAddress);
    let isValid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    if(!isValid){
        res.status(400);
        res.send(
            {
                "error": {
                  "code": 400,
                  "message": "The ip address is not valid",
                  "status": "INVALID_ARGUMENT"
                }
            }
        )
    }
    try{
        const infos = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=&ipAddress=${ip}`)
        
        res.send(infos.data)

    }catch(error){
        res.send(error)
    }
  })
  app.use(cors({
    origin: '*' // that will for all like  https / http 
  }))
  app.listen(3000, ()=>{
  })