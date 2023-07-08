const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    try {
      const response = await loginService.login(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

  async getByRole(req, res) {
    try {
      const response = await loginService.getByRole(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },
};

module.exports = loginController;