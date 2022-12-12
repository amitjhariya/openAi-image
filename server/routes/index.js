import express from 'express'
import OpenAi from './openai.js'



const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        message: "Server is Up and Running"
    })
})

router.get('/test', (req, res) => {
    res.send({
        message: "success"
    })
})




router.use('/api/v1/image', OpenAi)

export default router