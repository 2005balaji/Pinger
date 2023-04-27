const https = require('https');

// Replace the URL with the link you want to ping
const url = 'https://slippy.onrender.com/';

// Define the ping function
function ping() {
  https.get(url, (res) => {
    console.log(`Ping to ${url} succeeded with status code ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Ping to ${url} failed with error: ${err.message}`);
  });
}

// Schedule the ping function to run every 14 minutes
setInterval(ping, 14 * 60 * 1000);
