import { Router } from 'express'

import { endpoint } from './middlewares'

import { createspreadSheed } from './modules/spread-sheet/controller'
import { createsPostLeadList } from './modules/post-lead-list/controller'

export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.post('/upload', endpoint(createspreadSheed))

router.post('/post-lead-list', endpoint(createsPostLeadList))
