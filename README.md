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

___

## CLI Demo

The **cli-demo** is very simple and should be the very first demo that you should go to if you are new to Node.JS

==>> OBJECTIVE

The objective here is very simple, to display the list of files in a given directory (default to the directory where node is running the demo from).

==>> OUTPUT

```shell
USAGE: node cli-demo.js [&lt;directory name&gt;]

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
