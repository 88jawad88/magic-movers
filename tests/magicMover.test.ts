import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/magic-movers-test`;
  await mongoose.createConnection(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Magic Movers API', () => {
  it('should add a new Magic Mover', async () => {
    const res = await request(app)
      .post('/api/magic-movers/add')
      .send({
        name: 'Mover1',
        weightLimit: 100,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should add a new Magic Item', async () => {
    const res = await request(app)
      .post('/api/magic-items/add')
      .send({
        name: 'Item1',
        weight: 10,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should load a Magic Mover with items', async () => {
    const moverRes = await request(app)
      .post('/api/magic-movers/add')
      .send({
        name: 'Mover2',
        weightLimit: 200,
      });

    const itemRes = await request(app)
      .post('/api/magic-items/add')
      .send({
        name: 'Item2',
        weight: 20,
      });

    const res = await request(app)
      .post('/api/magic-movers/load')
      .send({
        moverId: moverRes.body._id,
        itemId: itemRes.body._id,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.questState).toEqual('loading');
  });


  it('should start a mission for a Magic Mover', async () => {
    const moverRes = await request(app)
      .post('/api/magic-movers/add')
      .send({
        name: 'Mover3',
        weightLimit: 300,
      });
  const itemRes = await request(app)
      .post('/api/magic-items/add')
      .send({
        name: 'Item3',
        weight: 30,
      });
    const loadRes = await request(app)
      .post('/api/magic-movers/load')
      .send({
        moverId: moverRes.body._id,
        itemId: itemRes.body._id,
      });

    const res = await request(app)
      .post('/api/magic-movers/start')
      .send({
        moverId: moverRes.body._id,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.questState).toEqual('on-mission');
  });

  it('should end a mission for a Magic Mover', async () => {
    const moverRes = await request(app)
      .post('/api/magic-movers/add')
      .send({
        name: 'Mover4',
        weightLimit: 400,
      });
  const itemRes = await request(app)
      .post('/api/magic-items/add')
      .send({
        name: 'Item4',
        weight: 40,
      });
    const loadRes = await request(app)
      .post('/api/magic-movers/load')
      .send({
        moverId: moverRes.body._id,
        itemId: itemRes.body._id
      });

    const startRes = await request(app)
      .post('/api/magic-movers/start')
      .send({
        moverId: moverRes.body._id,
      });
    const res = await request(app)
      .post('/api/magic-movers/end')
      .send({
        moverId: moverRes.body._id,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.questState).toEqual('resting');
    expect(res.body.missionsCompleted).toBeGreaterThan(0);
  });
});
