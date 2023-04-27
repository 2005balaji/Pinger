const https = require('https');

const urls = [
  'https://slippy.onrender.com/',
  'https://google.com/',
  // Add more URLs here
];

async function ping(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log(`Ping to ${url} succeeded with status code ${res.statusCode}`);
      resolve();
    }).on('error', (err) => {
      console.error(`Ping to ${url} failed with error: ${err.message}`);
      reject(err);
    });
  });
}

let index = 0;

setInterval(async () => {
  const url = urls[index];
  try {
    await ping(url);
  } catch (error) {
    console.error(`Failed to ping ${url}: ${error}`);
  }
  index = (index + 1) % urls.length;
}, 14 * 60 * 1000);
