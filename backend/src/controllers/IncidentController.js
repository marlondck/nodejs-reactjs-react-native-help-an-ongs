const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    // pegar paginacao
    const { page = 1} = request.query;

    // trazer 1 posicao do array  com a quantidade total de casos
    const [count] = await connection('incidents').count()
    // enviar como resposta no cabeçalho o total de casos
    response.header('X-Total-Count', count['count(*)']);

    // no join, relaciona as ongs com o id dos casos,
    // no limit traz 5 registros e offset pula de 5 em 5 conforme a pagina
    // no select seleciona os campos especificos repados no array
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page -1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
    return response.json(incidents)
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    });

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(!incident) {
      return response.status(401).json({ error: 'Not found.' })
    }
  
    if(incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' })
    }

    await connection('incidents').where('id', id).delete()

    return response.status(204).send()
  }
}