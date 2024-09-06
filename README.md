# espd-demo
JavaScript application demonstrating the usage of ESPD EDM for ESPD versions that do not have an ESPD Service implemented (e.g. v3.3.0, v4.0.0).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Licence](#licence)

## Instalation
The code in this repository is intended to run on GitHub Pages or as Single Page Web Application. If you want to test the code on your local machine, you have to perform the following steps:

1. clone the repository on your machine
```
git clone git@github.com:OP-TED/espd-demo.git
cd espd-demo
```
For local webserver, [Fastify](https://fastify.dev/) was chosen. Any webserver that serves static files will do the job. You need to server the root folder. The prerequisites for **Fastify** and other [NodeJS](https://nodejs.org/en/download/) libraries can be installed from the command line:
```
npm install
```
On local machine you can test the results by starting the local webserver:
```
npm start
```
This should start the local webserver on port **3000**, you site is available at: [http://localhost:3000](http://localhost:3000). Use your favourite Web Navigator to access the site.

## Usage

Go to the GitHub Pages site: [ESPD Demo](https://docs.ted.europa.eu/espd-demo/) to see the site live. The site contains a couple of sections:

### Section 1. Export

**Export** menu allows to download:
- **Excel** file for Codelits,
- Code Lists as archive.
- **Excel** file for Model and Datastructure 

Here you can find your **Excel** files:
- for Code Lists
- for ESPD Model and ESPD Data Structure

### Section 2. Code Lists

**Lists** allows you to view Code Lists and all elements details. You can view the XML version of the Code List.

### Section 3. UUID

**UUID** sections allows to explore the UUIDs for Exclusion Grounds and Selection Criteria. You can check the eCERTIS correspondence. Those UUIDs are the integration point between ESPD and eCERITS. If the UUID is not present in eCertis you will get an error. Please note that it takes a couple of minutes to retrieve the data from eCertis.  
The general search allows you to search by version, UUID, keywords or any combination.

### Section 4. View 

ESPD model visualiation - in order to model Criteria and better visualize the ESPD model we propose to use a UI visualitsation to get direct representation of what the model will look like on a web page.

We provide a basic behaviour demonstration of the rules behind each building block, cardinalities and the data type expected for each input.

### Section 5. Examples

ESPD Request and ESPD Response examples generator - we provide a JavaScript online implementation of the ESPD Request and Response example generator that will allow Member States to have a playground for testing latest ESPD versions. Member States will be able to generate specific examples and test the ESPD before implementation.

This is provided only for demonstrative purpouse and it is not an actual service. The Member States must use the officially implemented and agreed ESPD services for their corresponding country.

You can fill in the required fields and download an ESPD Request XML file of ESPD Response XML file.

## Licence

The project is developed and distributed under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
