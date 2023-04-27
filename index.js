const fs = require('fs')
const fastify = require('fastify')({ logger: true })
const https = require('https');
const data = require('./data.json');


fastify.post('/', (request, reply) => {
    const { link } = request.body;
    if (!link) {
      return reply.code(400).send({ error: 'Missing link parameter' });
    }
  
    // Read the contents of the existing data file
    fs.readFile('data.json', (err, fileData) => {
      if (err) {
        console.error(err);
        return reply.code(500).send({ error: 'Error reading file' });
      }
  
      // Parse the existing data as JSON
      const jsonData = fileData.toString() ? JSON.parse(fileData.toString()) : [];
  
      // Add the new link to the array
      jsonData.push(link);
  
      // Write the updated JSON back to the file
      fs.writeFile('data.json', JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err);
          return reply.code(500).send({ error: 'Error writing to file' });
        }
  
        reply.send({ success: true });
      });
    });
  });
  
  fastify.get('/data', (request, reply) => {
    fs.readFile('data.json', (err, data) => {
      if (err) {
        console.error(err);
        return reply.code(500).send({ error: 'Error reading file' });
      }
  
      const jsonData = JSON.parse(data.toString());
      reply.send(jsonData);
    });
  });
  

  
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
    const url = data[index];
    try {
      await ping(url);
    } catch (error) {
      console.error(`Failed to ping ${url}: ${error}`);
    }
    index = (index + 1) % data.length;
  }, 14 * 60 * 1000);

  

fastify.listen({ port: 8070 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
