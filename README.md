<div align="center">
<img src="./client/src/assets/BallotBoxIcon.png" width="500">   
<h1><strong>BALLOT BOX</strong></h1>
<h3>Open polls and aggregate election results using your own database</h3>
<h1></h1>

![GitHub package.json version](https://img.shields.io/github/package-json/v/gmattie/ballot-box?&color=&label=Version&style=flat-square)
[![license](https://img.shields.io/badge/License-GPL%20v3.0-lightgrey?style=flat-square)](./LICENSE)

</div>

## **Installation**

Install package dependencies for both the `./server` and `./client`:

```
npm install
```

Installing dependencies automatically calls the `preinstall` script, which installs the dependencies in their appropriate folders.

## **Database**

This application requires a **MongoDB** document-oriented database.

Please goto https://mongodb.com/ to register for your own database.

## **Environment**

Both the `./server` and `./client` directories must contain `.env` files in order to connect to your database, sign and verify JSON Web Tokens for user authentication and to send emails for user registration and password update confirmation.

#### **Server**

Please refer to the `./server/.envTemplate` file to see the key/value pairs that must be included in `./server/.env`:

```
#
# Components of the database URL with embedded credentials.  Special characters must be URL encoded.
#
# Example:
#
# DB_PASSWORD = "password12345"
# DB_PATH = "ballotbox.mongodb.net/params"
# DB_PROTOCOL = "mongodb+srv"
# DB_USERNAME = "ballotbox"
#
DB_PASSWORD = ""
DB_PATH = ""
DB_PROTOCOL = ""
DB_USERNAME = ""

#
# Private key for signing and verifying JSON Web Tokens.
#
# Example:
#
# JWT_PRIVATE_KEY = "abc123def456ghi789"
#
JWT_PRIVATE_KEY = ""

#
# Configuration of the outgoing email.
#
# Example:
#
# EMAIL_ADDRESS = "account@gmail.com"
# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_NAME = "Ballot Box"
# EMAIL_PASSWORD = "12345"
# EMAIL_SERVICE = "gmail"
#
EMAIL_ADDRESS = ""
EMAIL_HOST = ""
EMAIL_NAME = ""
EMAIL_PASSWORD = ""
EMAIL_SERVICE = ""
```

#### **Client**

Please refer to the `./client/.envTemplate` file to see the key/value pairs that must be included in `./client/.env`:

```
#
# JSON Web Token authorization for development environment
#
# Example:
#
# REACT_APP_DEV_JWT = "abc123def456ghi789"
#
REACT_APP_DEV_JWT = ""
```

## **Development**

Run the **server** and/or **client** from the root directory to test your code:

```
npm run server
```

```
npm run client
```

## **License**

[**GNU General Public License v3.0**](./LICENSE)

Copyright © 2020 Geoffrey Mattie
