import express from 'express';
import segmentsRouter from './src/segment.js';
import usersRouter from './src/client.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = 8080;
const server = new express;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
  },
  apis: ['./src/segment.js', './src/client.js'], // Укажите пути к вашим маршрутам
};

const swaggerSpec = swaggerJSDoc(options);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(express.json());
server.use('/segments', segmentsRouter);
server.use('/users', usersRouter);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

server.get('/test', (req,res) => {
  res.status(200).send('Im ok')
})



