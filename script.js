// Grab references to the HTML elements
const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

// Disable the submit button by default
submitButton.disabled = true;

// Add event listeners for the text area and submit button
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

// Function to verify the length of the text in the text area
function verifyTextLength(e) {
  // Get the HTML element that triggered the event
  const textarea = e.target;

  // Check if the text length is within the acceptable range
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // Enable the submit button if the length is valid
    submitButton.disabled = false;
  } else {
    // Disable the submit button if the length is invalid
    submitButton.disabled = true;
  }
}

// Function to handle the submission of data
function submitData(e) {
  // Add a loading animation to the submit button
  submitButton.classList.add("submit-button--loading");

  // Get the text from the text area
  const text_to_summarize = textArea.value;

  // Prepare the headers for the request
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Prepare the body of the request
  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  // Configure the request options
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Make the API call using fetch
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Get the summarized text from the response
    .then(summary => {
      // Update the output text area with the summary
      summarizedTextArea.value = summary;

      // Remove the loading animation from the submit button
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      // Log any errors that occur
      console.log(error.message);
    });
}
