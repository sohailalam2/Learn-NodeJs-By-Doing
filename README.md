Learn-NodeJs-By-Doing
=====================

####This is how I learnt NodeJS.

Install all dependencies by executing the following command in the root directory of the project

```shell
npm install
bower install
```

Once all the dependencies are installed, please go to the *demo* directory and execute the demo that you want.

```shell
node xxxx-demo.js
```
where xxxx is the name of the particular demo.

**Your comments are welcome!!**

___

## CLI Demo

The **cli-demo.js** is very simple and should be the very first demo that you should go to if you are new to Node.JS

==>> OBJECTIVE

The objective here is very simple, to display the list of files in a given directory (default to the directory where node is running the demo from).

==>> OUTPUT

```shell
USAGE: node cli-demo.js [<directory name>]

Displaying files/directories from: ~\Learn-NodeJs-By-Doing\demo

Select which file or directory you want to see:

0  cli-demo.js
1  connect-demo.js
2  http-demo.js
3  http-helper.js
4  public/
5  request-time.js
6  tcp-demo.js
7  users.json

Enter your choice: 4

(1 files)

-   index.html
```
___

## TCP Demo

The **tcp-demo.js** is a very simple TCP based chat Server. This should be your next landing position after the cli-demo.

==>> OBJECTIVE

The objective is to implement a simple chat server on top of TCP/IP protocol.

This implementation expects the user to enter a Nickname in a given time interval (10 seconds by default).

If the user fails to enter the nickname in time, the connection is aborted automatically.

Also, if the nickname is already taken up by someone else, then the user is informed and he/she must choose a new nickname in time.

Once the nickname is accepted, the user sees a welcome message and the server is ready to receive messages from the user which will be broadcasted to everone else.

___

## HTTP Demo

The **http-demo.js** is a very simple HTTP Server which can serve files from the *public* directory. This should be your next landing position after the tcp-demo.

==>> OBJECTIVE

The objective is to implement a simple HTTP Server.

The server by default starts up on port 3333 and you can visit http://localhost:3333/ to view the index.html page.

The page has two forms, but this demo only uses the Login Form. Specifically, it only uses the username and no real authentication is implemented here. For more advanced demo check out the **connect-demo.js**.

Enter a username (and password, as both are required) and Login. This will POST the form to the Server which will then reply back with a message.

___

## Connect Demo

The **connect-demo.js** is a slightly advanced HTTP Server which leverages the simplicity provided by the Connect.JS Node Module. This should be your next landing position after the http-demo.

==>> OBJECTIVE

The objective is to implement a simple HTTP Server using Connect Module.

This example also runs the server on port 3333 and you can visit http://localhost:3333/ to view the index.html page.

This is a slightly advanced demo, showing Session management on server side and somewhat real authentication.


