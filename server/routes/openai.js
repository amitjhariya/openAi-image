import express from 'express'
const router = express.Router()
import {imageGenerate} from './../controllers/openAi.js'
 

router.post('/',imageGenerate)

export default router