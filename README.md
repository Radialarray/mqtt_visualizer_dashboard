#install dashboard

### Install mongodb with Homebrew
Install with [Homebrew](https://brew.sh/)
```
brew install mongodb
```

### Install node.js
Install with [NVM](https://github.com/creationix/nvm) (recommended by nodejs-project)

or

Install with [Homebrew](https://brew.sh/)
```
$ brew install node
```

### Install dependencies with npm
```
cd /projectfolder
npm install
```
### Don't forget to set the right ip in your code for huzzah/other devices which will connect to mqtt server!!

### Run test without running server
runs project without starting the server daemon.
for changing html, css
```
npm test
```

### Run project with server
```
npm start
```


### Stop Server
1.  To stop the server open a shell and type
```
mongo
```
2.
```
use admin
db.shutdownServer()
```
3.  Leave the process with ctrl-c
4.  To stop the process type:
```
pkill mongo
```

### Knowledge Base
Start MongoDB Server in other folder:
```
mongod --dbpath=/databasefolder --port 27017
```

To create a capped Collection
```
db.createCollection(„collectionname“,{capped:true,size:10000,max:1000})
```

Get fast to folder
```
cd /folder
```

Set a static IP for connecting to mqtt server:
Example: 192.168.178.32
