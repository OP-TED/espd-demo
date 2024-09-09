# The espd-demo
The espd-demo is a JavaScript application demonstrating the usage of the ESPD-EDM for ESPD versions that currently do not have an ESPD Service implemented (e.g. v3.3.0, v4.0.0).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Licence](#licence)

## Installation
The code in this repository is intended to run on GitHub Pages or as a Single Page Web Application. If you want to test the code on your local machine, you have to perform the following steps:

1. clone the repository on your machine
```
git clone git@github.com:OP-TED/espd-demo.git
cd espd-demo
```
2. Use a local webserver that renders static web files. Here, [Fastify](https://fastify.dev/) was chosen, but any webserver that serves static files will do. You will need to install and run the local webserver in the root folder. The following prerequisites for **Fastify** and other [NodeJS](https://nodejs.org/en/download/) libraries can be installed from the command line:
```
npm install
```
On your local machine you can test the results by starting the local webserver:
```
npm start
```
This should start the local webserver on port **3000**, your site will then be available at: [http://localhost:3000](http://localhost:3000). Use any web browser to access the site.

## Usage

Go to the GitHub Pages site: [ESPD Demo](https://docs.ted.europa.eu/espd-demo/) (or your local installation) to see the site live. The demo contains the following sections:

### Section 1. Export

The **Export** menu allows you to download:
- The **Excel** file for Codel Lists,
- All Code Lists as an archive file.
- The **Excel** file for the Model and Datastructure 

### Section 2. Code Lists

**Lists** allows you to view Code Lists and all the elements details. Here you can view the XML version of the Code List.

### Section 3. UUID

The **UUID** sections allows to explore the UUIDs for Exclusion Grounds and Selection Criteria. You can also check whether these UUIDs are available in eCERTIS. Those UUIDs are the integration point between the ESPD and eCERITS. If the UUID is not present in eCertis, it will return an error. Please note that it can take a couple of minutes to retrieve the data from eCertis.  

The general search allows you to search by version, UUID, keywords or any combination.

### Section 4. View 

The ESPD model visualiation - to model Criteria and visualise the ESPD model better, we have created a basic UI visualisation so that you can see what the model might look like on a web page.

We provide a basicdemonstration of the behaviour of the rules behind each building block, the cardinalities, and the data type expected for each input.

### Section 5. Examples

ESPD Request and ESPD Response examples generator - here we provide a JavaScript online implementation of the ESPD Request and Response example generator that will give Member States a playground for testing the latest ESPD versions. Member States will be able to generate specific examples and use them to test their ESPD before implementation.

This is provided only for demonstrative purposes only and is not an actual service. Member States must use the officially implemented and agreed ESPD services for their corresponding country.

You can fill in the required fields and download an ESPD Request XML file of ESPD Response XML file.

## Licence

The project is developed and distributed under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
