const registerService = require('../services/registerService');

const registerController = {
  async register(req, res) {
    try {
      const response = await registerService.register(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },
};

module.exports = registerController;
