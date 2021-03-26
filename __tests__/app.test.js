const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a todo to the todo database and send a confirmation email', async () => {
    const result = await request(app)
      .post('/api/v1/orders')
      .send({ todoItem: 'clean the kitchen', date: '03/26/2021', importance: 'very important'});

    expect(result.body).toEqual({
      id: '1',
      todoItem: 'clean the kitchen', 
      date: '03/26/2021', 
      importance: 'very important'
    })

  })
});
