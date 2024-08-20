import { Router } from 'express'

import { endpoint } from './middlewares'

import { createspreadSheed } from './modules/spread-sheet/controller'
import { createsPostLeadList } from './modules/post-lead-list/controller'
import { postSurvey } from './modules/post-survey-list/controller'
import { chPostSurvey } from './modules/ch-post-survey/controller'
import { syncActiveCampaign } from './modules/sync-active-campaign/controller'
import { surveySummary } from './modules/ch-survey-summary/controller'
import { getHeadersCSVInit } from './modules/get-headers-csv/controller'

export const router = Router()

router.post('/upload', endpoint(createspreadSheed))

router.post('/post-lead-list', endpoint(createsPostLeadList))

router.post('/sync-active-campaign', endpoint(syncActiveCampaign))

router.post('/post-survey-list', endpoint(postSurvey))

router.post('/ch-post-survey', endpoint(chPostSurvey))

router.post('/ch-survey-summary', endpoint(surveySummary))

router.post('/get-headers-csv', endpoint(getHeadersCSVInit))
