# espd-demo
Javascript application demonstrating the usage of ESPD EDM

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Licence](#licence)

## Instalation
The code in this repository is intended to run on Github Pages or as PWA. If you want to test the code on your local machine, you can do the following steps:

1. clone the repository on your machine
```
git clone git@github.com:OP-TED/espd-demo.git
cd espd-demo
```
For local webserver, [Fastify](https://fastify.dev/) was chosen. Any webserver that serves static files will do the job. You need to server the root folder. The prerequisites for **Fastify**: [NodeJS](https://nodejs.org/en/download/) and the framework itself:
```
npm install
```
Develop on local machine and you can test the results using a local webserver:
```
npm start
```
This should start the local webserver on port **3000**, you site is available at: [http://localhost:3000](http://localhost:3000)

## Usage

Go to the Github Pages site: [ESPD Demo](https://)
You session data is saved in the browser storage. The site uses [PouchDB](https://pouchdb.com) to store your session data. There is no data sent to any server.

The site contains 2 sections:
### Section 1. ESPD model visualiation

In order to model and better visualize the ESPD model we propose to use [Blockly](https://developers.google.com/blockly/). This allows the user to better visualize the building blocks of ESPD request, also to have a direct representation of what the model will look like on a web page.

We provide a basic behaviour demonstration of the rules behind each building block.

### Section 2. ESPD Request-Response service demo 

We provide a JavaScript online implementation of the ESPD service that will allow Member States to have a playground for testing various Request versions and possible types of Responses.

This is provided only for demonstrative purpouse and it is not an actual service. The Member States must use the officially implemented and agreed ESPD services for their corresponding country.

## Licence

The project is developed and distributed under EUROPEAN UNION PUBLIC LICENCE v. 1.2.