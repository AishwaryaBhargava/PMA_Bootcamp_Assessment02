import Weather from '../models/Weather.js';

export const createWeather = async (req, res) => {
  try {
    const weather = new Weather(req.body);
    const saved = await weather.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getWeather = async (req, res) => {
  try {
    const data = await Weather.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWeather = async (req, res) => {
  try {
    const updated = await Weather.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteWeather = async (req, res) => {
  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
