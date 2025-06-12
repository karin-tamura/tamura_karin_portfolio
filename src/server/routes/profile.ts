import express from 'express'
import { getProfile, updateProfile } from '../../controllers/profileController'
import { asyncHandler } from '../../middleware/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(getProfile))
router.post('/', asyncHandler(updateProfile))

export default router
