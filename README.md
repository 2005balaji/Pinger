# Pinger

## About:

This code is a Node.js server that receives POST requests to add links to a JSON file and responds with a success message, and a GET request to retrieve the JSON file with the links. It also pings the URLs in the JSON file every 14 minutes to check if they are still up.

## Why this project

Serverless architecture is a cloud computing model where the cloud provider manages the infrastructure, allowing developers to focus on writing code without having to worry about server maintenance. In this model, the code runs in stateless containers that are created and executed only when triggered by an event or request, rather than continuously running on a server.

The project in question aims to eliminate the problem of **"cold starts"** , which refers to the delay in the initial execution of a function due to the need to spin up a new container. By implementing strategies such as pre-warming containers or utilizing functions that are more frequently triggered, developers can ensure that their serverless functions are always available and responsive, without the need for manual server management.

## Tech Stack

1. **Node.js: A JavaScript runtime environment that executes JavaScript code outside of a web browser.**
2. **Fastify: A fast and low overhead web framework for Node.js.**
3. **fs: A Node.js module that provides an API for interacting with the file system.**
4. **https: A Node.js module that provides an API for making HTTPS requests.**

## Approach

The approach of this code is to read the contents of an existing JSON file, add new links to it via POST requests, and retrieve the contents of the file via GET requests. Additionally, it pings the URLs in the JSON file every 14 minutes to check if they are still up.

When the server receives a POST request to add a new link, it first checks that the link parameter is present in the request body. If it is not, the server returns a 400 error with an error message. If it is present, the server reads the contents of the data.json file, parses it as JSON, adds the new link to the array, and writes the updated JSON back to the file. If there is an error while reading or writing to the file, the server returns a 500 error with an error message. If everything is successful, the server responds with a success message.

When the server receives a GET request to retrieve the JSON file, it reads the contents of the data.json file, parses it as JSON, and sends the JSON data as a response. If there is an error while reading the file, the server returns a 500 error with an error message.

Finally, the server pings the URLs in the JSON file every 14 minutes using the ping function. This function uses the https module to make a request to the URL, logs the status code of the response, and resolves or rejects the promise depending on whether the request was successful or not. The setInterval function is used to repeatedly call this function every 14 minutes for each URL in the JSON file. If there is an error while pinging a URL, the server logs an error message.
