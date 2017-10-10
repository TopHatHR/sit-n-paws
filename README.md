# sit-n-paws

> This application is for connecting pet owners who want to temporarily leave their beloved pets with other pet lovers (referred to as __hosts__) to safely care for them for a reasonable fee.

## Team

  - __Product Owner__: Lillian Lee
  - __Scrum Master__: Dominic Ma
  - __Development Team Members__: Ed Plato, Chris Pfaff

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Testing](#testing)
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

After installing and building the application (see below [Installing Dependencies](#installing-dependencies)), navigate to the login page from the landing page. Here you can register a user and be redirected to the main application.

Once in the main application, the user can view host listings, search for hosts by zip code, and interact with the listings. If you want to find a host, simply find a listing you like and click contact me. This will then provide a prompt to connect with the host via email. If you want to become a host, click the paw print icon in the upper-left navbar to access the form for creating a host listing.

In addition to finding hosts for your pets and hosting your home to watch pets, the user can edit their profile to update user details.

## Requirements

- Node 6.11.0 and higher
- Mongodb latest
- see package.json for dependencies

## Development

### Installing Dependencies

First install [node.js](http://nodejs.org/) and [mongodb](https://www.mongodb.org/downloads). Then from within the root directory:

```sh
sudo npm install -g nodemon
npm install
```

Open your favorite terminal and run these commands:

First Tab:
```sh
npm run build
```

Second Tab:

```sh
npm start
```

Webpack bundle.js will be built in:

```sh
src/public/dist/bundle.js
```

This application uses Cloudinary image service for uploading.

You will need to sign up for [Cloudinary](https://cloudinary.com/) and create an account to use the api. Create a config file for your api object in the following format:

```sh
This is the shape of the object from the config file which is gitignored

 const cloudConfig = {
   cloud_name: 'top-hat',
   api_key: 'API_KEY',
   api_secret: 'API_SECRET'
 };
```

Save this Cloudinary config file as:

```sh
cloudinary/config.js
```

### Testing

Testing is primarily managed through [Mocha](https://mochajs.org/) and [Chai](chaijs.com/). Run this command in your terminal:

```sh
npm test
```

### Roadmap

View the project roadmap [here](https://github.com/TopHatHR/sit-n-paws/issues)

## Contributing

Want to contribute? Great!

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

## MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.