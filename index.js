import express from 'express';
import segmentsRouter from './src/segment.js';
import usersRouter from './src/client.js';

const PORT = 8080;
const server = new express;

server.use(express.json());
server.use('./src/segments', segmentsRouter);
server.use('./src/users', usersRouter);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

server.get('/test', (req,res) => {
  res.status(200).send('Im ok')
})



