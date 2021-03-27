const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('aws-sdk/clients/ses', () => {
  const mSES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return jest.fn(() => mSES);
});

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a todo to the todo database and send a confirmation email', async () => {
    const result = await request(app)
      .post('/api/v1/todos')
      .send({ todoItem: 'clean the kitchen', date: '03-27-2021', importance: 'very important'});

    expect(result.body).toEqual({
      id: '1',
      todoItem: 'clean the kitchen', 
      date: '3/27/2021, 12:00:00 AM', 
      importance: 'very important'
    });
  });

  it('should retrieve all todos from database', async () => {

    await request(app)
      .post('/api/v1/todos')
      .send({ todoItem: 'clean the kitchen', date: '03-27-2021', importance: 'very important'});
    await request(app)
      .post('/api/v1/todos')
      .send({ todoItem: 'clean the bathroom', date: '03-27-2021', importance: 'very important'});

    const result = await request(app)
      .get('/api/v1/todos');

      expect(result.body).toEqual([
        {
          id: '1',
          todoItem: 'clean the kitchen', 
          date: '3/27/2021, 12:00:00 AM', 
          importance: 'very important'
        },
        {
          id: '2',
          todoItem: 'clean the bathroom', 
          date: '3/27/2021, 12:00:00 AM', 
          importance: 'very important'
        },
    ]);    
  });
  it('should retrieve a todo by ID', async () => {

    await request(app)
      .post('/api/v1/todos')
      .send({ todoItem: 'clean the kitchen', date: '03-27-2021', importance: 'very important'});
    await request(app)
      .post('/api/v1/todos')
      .send({ todoItem: 'clean the bathroom', date: '03-27-2021', importance: 'very important'});

    const result = await request(app)
      .get('/api/v1/todos/2');

      expect(result.body).toEqual(
        {
          id: '2',
          todoItem: 'clean the bathroom', 
          date: '3/27/2021, 12:00:00 AM', 
          importance: 'very important'
        },
    );    
  });

  it('should update a todo with a new level of importance', async () => {
    await request(app)
    .post('/api/v1/todos')
    .send({ todoItem: 'clean the kitchen', date: '03-27-2021', importance: 'very important'});

    await request(app)
      .put('/api/v1/todos/1')
      .send({ importance: 'not very important'});

    const result = await request(app)
      .get('/api/v1/todos');

      expect(result.body).toEqual([{
        id: '1', todoItem: 'clean the kitchen', date: '3/27/2021, 12:00:00 AM', importance: 'not very important'
      }])
  })
  it('should delete a todo from the database by id', async () => {
    await request(app)
    .post('/api/v1/todos')
    .send({ todoItem: 'clean the kitchen', date: '03-27-2021', importance: 'very important'});

    await request(app)
    .post('/api/v1/todos')
    .send({ todoItem: 'clean the bathroom', date: '03-27-2021', importance: 'not important'});

    await request(app)
      .delete('/api/v1/todos/2')

    const result = await request(app)
      .get('/api/v1/todos');

      expect(result.body).toEqual([{
        id: '1', todoItem: 'clean the kitchen', date: '3/27/2021, 12:00:00 AM', importance: 'very important'
      }])
  })



});
