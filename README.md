# Messap Instant Messaging

##### Messap is a simple Instant Messaging application. Node.js & Express is powering the back, while React & Bootstrap takes care of the front. Client <=> Server communication is handled over a Socket.io web socket.

Data is stored in the local storage, which is not recommended when storing sensitive data, even if it is possible to encrypt said data in order to evade cons of this storage method. However, the scope of this project is mainly focused on the rendering of a specific data flow. Persistent data storage over a mongo db instance is covered in the [Social CRUD project](https://github.com/jocarol/social-crud) you can find in my repos.

CSS "dark theme" is fully custom.

## Building

1. Open a terminal and git clone the project with :
```console
foo@bar:~$ git clone https://github.com/jocarol/messap && cd messap
```
2. Navigate to the server directory and install the node modules with 'yarn'.
3. Start the server with 'yarn start'.
4. Navigate to the client directory and install the node modules with 'yarn'.
5. Start the client with 'yarn start'.

![alt text](https://i.imgur.com/n6mR1uk.gif)

## How To
New users should generate a new ID in order to be able to broadcast messages. That ID is displayed on the bottom left part of the App.

![alt](https://i.imgur.com/7np8rIc.png)

Any client in the network can join the local address the app is running on. Since the ID is managed in the local storage, you can also open multiple clients in a private browser. When adding a new contact, this ID is the ID you need to input in the ID form field.

![alt](https://i.imgur.com/oCSt4NK.png)

Messap allows multiple users conversations, make sure to try it out ;)
