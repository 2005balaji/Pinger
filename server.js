const https = require('https');

const urls = [
  'https://slippy.onrender.com/',
  'https://dsa101.onrender.com/',
  'https://invitemate.onrender.com/',
  'https://digislam.onrender.com/digislam/apis/users',
  'https://blynd-server.onrender.com/',
  'https://phonewise.onrender.com/api/brands',
  'https://thedailydigest.onrender.com/',
  'https://queueup.onrender.com/',
  'https://brickel-server.onrender.com/',
  'https://bookstop.onrender.com/api/product',
  'https://cravesavor2.onrender.com/',
  'https://agroshield.up.railway.app/userinput?cropName=rice'
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
