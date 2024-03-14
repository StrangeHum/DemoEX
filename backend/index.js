import express from 'express'
const app = express()

app.get("/api",(req, res)=>{
    console.log("foo")
    res.json({message: "Hi"})
})

app.listen(5000, ()=> console.log("start"))