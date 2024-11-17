// backend.js
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

// Replace with your actual project ID and reCAPTCHA keys
const projectID = "your-google-cloud-project-id";  // Your Google Cloud Project ID
const recaptchaKey = "your-site-key";  // Replace with your reCAPTCHA site key
const recaptchaSecret = "your-secret-key";  // Replace with your reCAPTCHA secret key

async function createAssessment({ token, recaptchaAction }) {
  // Create the reCAPTCHA client
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Build the assessment request
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  try {
    // Call the reCAPTCHA Enterprise API
    const [response] = await client.createAssessment(request);

    // Check if the token is valid
    if (!response.tokenProperties.valid) {
      console.log(`Token verification failed. Reason: ${response.tokenProperties.invalidReason}`);
      return null;
    }

    // Check if the action matches the expected action
    if (response.tokenProperties.action === recaptchaAction) {
      console.log(`reCAPTCHA score: ${response.riskAnalysis.score}`);
      response.riskAnalysis.reasons.forEach((reason) => {
        console.log(`Reason: ${reason}`);
      });
      return response.riskAnalysis.score;
    } else {
      console.log("Action mismatch");
      return null;
    }
  } catch (error) {
    console.error("Error during reCAPTCHA assessment:", error);
    return null;
  }
}

// Example usage (this would be called when you send the token from the client)
createAssessment({
  token: "example-client-token",  // The token sent from the client
  recaptchaAction: "login"  // The action that was performed (e.g., login, signup)
}).then(score => {
  if (score !== null) {
    console.log(`Risk score: ${score}`);
  }
});
