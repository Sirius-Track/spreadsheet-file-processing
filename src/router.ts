import { Router } from 'express'

import { endpoint } from './middlewares'

import { createspreadSheed } from './modules/spread-sheet/controller'

export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.post('/upload', endpoint(createspreadSheed))
