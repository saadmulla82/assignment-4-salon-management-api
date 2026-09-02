const salonModel = require('../models/salonModel');
const serviceModel = require('../models/serviceModel');

const getAllSalons = async (req, res) => {
  try {
    const salons = await salonModel.findAll();
    return res.status(200).json(salons);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const getTopSalons = async (req, res) => {
  try {
    const salons = await salonModel.findTopRated(5);
    return res.status(200).json(salons);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const getSalonsByCity = async (req, res) => {
  try {
    const salons = await salonModel.findByCity(req.params.city);
    return res.status(200).json(salons);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const getSalonById = async (req, res) => {
  try {
    const salon = await salonModel.findById(req.params.id);
    if (!salon) return res.status(404).json({ error: 'Salon not found.' });
    return res.status(200).json(salon);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const createSalon = async (req, res) => {
  try {
    const { name, city, address, rating } = req.body;
    const newSalon = await salonModel.create({ name, city, address, rating });
    return res.status(201).json({ message: 'Salon created successfully', salon: newSalon });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const updateSalon = async (req, res) => {
  try {
    const updatedSalon = await salonModel.update(req.params.id, req.body);
    return res.status(200).json({ message: 'Salon updated successfully', salon: updatedSalon });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const deleteSalon = async (req, res) => {
  try {
    await salonModel.delete(req.params.id);
    return res.status(200).json({ message: 'Salon deleted successfully' });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const getSalonServices = async (req, res) => {
  try {
    const services = await serviceModel.findBySalonId(req.params.id);
    return res.status(200).json(services);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const addServiceToSalon = async (req, res) => {
  try {
    const { serviceName, service_name, price, duration, isAvailable, is_available } = req.body;
    const resolvedName = serviceName || service_name;
    const newService = await serviceModel.create({
      salon_id: req.params.id,
      service_name: resolvedName,
      price,
      duration,
      is_available: isAvailable !== undefined ? isAvailable : is_available
    });
    return res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

module.exports = { getAllSalons, getTopSalons, getSalonsByCity, getSalonById, createSalon, updateSalon, deleteSalon, getSalonServices, addServiceToSalon };