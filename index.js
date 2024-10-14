const express = require('express');
const app = express();
const port = 3000;

// Import the summarizeText function
const summarizeText = require('./summarize.js');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
  // Get the text to summarize from the request body
  const text = req.body.text_to_summarize;

  // Call summarizeText function and handle the response
  summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Internal Server Error'); // Send an error response if something goes wrong
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
