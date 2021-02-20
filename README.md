# notificationSystem

For this challenge we'll be creating a HTTP notification system. A server (or set of servers) will keep track of topics ->
subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it
should be forwarded to all subscriber endpoints.

<br>


## Installation 
To install, using:
```
npm install
```

## Endpoints 

All endpoints are in src > api > index.js 

## Development

### Starting
To start, use:
```
npm start
```


## Project Structure
<pre>
<b>src</b>
 ┣ <b>api</b>           // Contains the controller file where all the codes that do the actual work are. 
 ┃ ┗ ...  
 ┣ <b>config</b>       // Contains mongodb URLs for development and production, ...
 ┃ ┣ config
 ┃ ┗ ...
 ┣ <b>helpers</b>     // Contains utility files
 ┃ ┣ utility
 ┃ ┗ ...
 ┣ <b>models</b>     // Contains all mongodb models
 ┃ ┗...
 ┣ <b>routes</b>    // Contains route files
 ┃ ┗...
 ┣ index.js
</pre>
