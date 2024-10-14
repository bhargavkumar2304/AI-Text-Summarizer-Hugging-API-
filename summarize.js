const axios = require('axios');

// This is the function where the call to the API is made. Returns the summarized text as a string.
async function summarizeText(text) {
  // Data to send in the API request
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 200,
      "min_length": 30
    }
  });

  // Configuration for the API request
  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN'] // Use the access token stored in Replit secrets
    },
    data: data
  };

  // Make the API request and handle the response
  try {
    const response = await axios.request(config);
    return response.data[0].summary_text; // Return the summary text from the response
  } catch (err) {
    console.log(err);
    throw new Error('Error fetching summary'); // Throw an error if the API call fails
  }
}

// Export the summarizeText function to be used in other files
module.exports = summarizeText;
