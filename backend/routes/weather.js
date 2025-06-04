import express from 'express';
import {
  createWeather,
  getWeather,
  updateWeather,
  deleteWeather
} from '../controllers/weatherController.js';

const router = express.Router();

router.post('/', createWeather);
router.get('/', getWeather);
router.put('/:id', updateWeather);
router.delete('/:id', deleteWeather);

export default router;
