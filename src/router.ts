import { Router } from 'express'

import { endpoint } from './middlewares'

import { createspreadSheed } from './modules/spread-sheet/controller'
import { createsPostLeadList } from './modules/post-lead-list/controller'
import { postSurvey } from './modules/post-survey-list/controller'
import { syncActiveCampaign } from './modules/sync-active-campaign/controller'

export const router = Router()

router.post('/upload', endpoint(createspreadSheed))

router.post('/post-lead-list', endpoint(createsPostLeadList))

router.post('/sync-active-campaign', endpoint(syncActiveCampaign))

router.post('/post-survey-list', endpoint(postSurvey))
