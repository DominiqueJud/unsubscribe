const unsubscribeRouter=require('express').Router()
const mysql= require('mysql')
require('dotenv').config()


const config={
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  }

const db=mysql.createConnection(config)

db.connect((error)=>{
    if(error){
        console.log('Error connecting to the MySQL DB',error.message)
    }
    else{console.log('Connected to MySQL DB')}
})

setInterval(()=>{
    db.query('SELECT 1')
},5000)

const isEmailCorrectFormat=(email)=>{
    const emailPattern= /\S+@\S+[.]\S+/
    return(emailPattern.test(email))
}


unsubscribeRouter.get('/', async (request, response)=>{
    await db.query('SELECT * FROM email_blacklist', (error, results) =>{
        if(error){
            console.log('Error during SQL Query',error.message)
            response.status(400).send({error:'SQL Error'})
            return
        }
        else{
            response.json(results)
        }
    })
})

unsubscribeRouter.get('/test', async (request,response) =>{
    const email= request.query.email
    const reason=request.query.subject
    console.log(email,reason)
    if(!isEmailCorrectFormat(email)){
        console.log(email, 'is not a Valid Email adress')
        response.status(400).send('Enter a valid Email Adress')
        return
    }
    await db.query(`INSERT INTO email_blacklist(email,time_of_unsubscription,unsubscribe_reason) VALUES('${email}',NOW(),'${reason}')`,(error, result)=>{
        if(error){
            console.log('Error inserting a new Entry to the DB', error.message)
            response.status(400).json({error:error.stack})
            return
        }
        else{
            response.status(201).json(result)
        }
    })
})

unsubscribeRouter.post('/', async (request,response) => {
    const {email,reason}= request.body
    if(!isEmailCorrectFormat(email)){
        console.log(email, 'is not a Valid Email adress')
        response.status(400).send('Enter a valid Email Adress')
        return
    }
    const timestamp=new Date(Date.now())
    const currentTime=`${timestamp.getFullYear()}-${timestamp.getMonth()}-${timestamp.getDay()}`
    console.log(email, currentTime, reason)
    await db.query(`INSERT INTO email_blacklist(email,time_of_unsubscription,unsubscribe_reason) VALUES('${email}',NOW(),'${reason}')`,(error, result)=>{
        if(error){
            console.log('Error inserting a new Entry to the DB', error.message)
            response.status(400).json({error:error.stack})
            return
        }
        else{
            response.status(201).json(result)
        }
    })
} )

unsubscribeRouter.delete('/:email', async (request,response) => {
    try{
    const email=request.params.email
    if(!isEmailCorrectFormat(email)){
        console.log(email, 'is not a Valid Email adress')
        response.status(400).send('Enter a valid Email Adress')
        return
    }
    console.log(email)
    await db.query(`DELETE FROM email_blacklist WHERE email="${email}"`, (error, result)=>{
        if(error){
            console.log('Error while Deleting from Db', error.message)
            response.status(400).json(error.message)
            return
        }
        else{
            response.status(201).json(result)
        }
    })}
    catch(error){
        console.log(error.message)
        response.status(400).send({error:error.message})
    }
})

module.exports = unsubscribeRouter