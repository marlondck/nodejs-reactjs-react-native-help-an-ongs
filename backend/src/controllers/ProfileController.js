const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    try {
      const insidents = await connection('incidents').where('ong_id', ong_id).select('*');
      return response.json(insidents)
    } catch (error) {
      return response.status(401).json({ error: 'Not Found.' })
    }  
  }
}