import express from 'express';
import mongoose from 'mongoose';
import "reflect-metadata"
import magicMoverRoutes from './routes/magicMoverRoutes';
import magicItemRoutes from './routes/magicItemRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerSpec = YAML.load(path.join(__dirname,'swagger.yaml'));

/**
 * MongoDB connection URI.
 * @type {string}
 */
const uri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/magic_movers`;

/**
 * Express application instance.
 * @type {import('express').Application}
 */
const app = express();

/**
 * Connect to MongoDB.
 * @returns {Promise<void>}
 */
mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware to parse JSON requests
app.use(express.json());

// Routes for magic movers
app.use('/api/magic-movers', magicMoverRoutes);

// Routes for magic items
app.use('/api/magic-items', magicItemRoutes);

/**
 * Setup Swagger for API documentation.
 * @param {import('express').Application} app - Express application instance.
 */


// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;
