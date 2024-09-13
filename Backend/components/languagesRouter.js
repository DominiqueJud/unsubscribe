const languagesRouter=require('express').Router()

languagesRouter.get('/en',(request, response)=>{
    response.json({language:'English'})
})

languagesRouter.get('/de',(request,response)=>{
    response.json({language:'Deutsch'})
})

languagesRouter.get('/fr',(request, response)=>{
    response.json({language:'Francais'})
})

module.exports= languagesRouter