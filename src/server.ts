import app from './app';

/**
 * The port number on which the server will listen.
 * @type {number|string}
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the server and listen on the specified port.
 * @param {number|string} PORT - The port number.
 * @param {Function} callback - Callback function to execute when the server starts.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
