# Magic Movers API

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with your MongoDB connection string and port number
4. Run `npm run dev` to start the development server

## Environment Variables

Create a `.env` file in the root of your project with the following content:

PORT=5000
MONGO_URI=mongodb://localhost:27017/magic_movers

## Running the Application

1. Ensure MongoDB is running on your machine or use a cloud MongoDB service.
2. Run `npm run dev` to start the development server or `npm run start` to start server without tracking updates in code.
3. Use a tool like Postman to interact with the API endpoints.

## Endpoints

### Magic Movers

- `POST /api/magic-movers/add` - Add a new Magic Mover
- `POST /api/magic-movers/load` - Load a Magic Mover with items
- `POST /api/magic-movers/start` - Start a mission for a Magic Mover.
- `POST /api/magic-movers/end` - End a mission for a Magic Mover.
- `GET /api/magic-movers/top` - Get top movers by missions completed
- `GET /api-docs` - Get api live documents(swagger UI)

### Magic Items

- `POST /api/magic-items/add` - Add a new Magic Item

### tests

- Run `npm run test` to run the test file magicMover.test.ts and test the api end points
