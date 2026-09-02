const serviceModel = require('../models/serviceModel');

const getAvailableServices = async (req, res) => {
  try {
    const services = await serviceModel.findAvailable();
    return res.status(200).json(services);
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const updateService = async (req, res) => {
  try {
    const updated = await serviceModel.update(req.params.id, req.body);
    return res.status(200).json({ message: 'Service updated successfully', service: updated });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};

const deleteService = async (req, res) => {
  try {
    await serviceModel.delete(req.params.id);
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) { return res.status(500).json({ error: error.message }); }
};
module.exports = { getAvailableServices, updateService, deleteService };