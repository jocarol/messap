const displayMotto = require('./moto.js');
const chalk = require('chalk');
const log = console.log;

displayMotto();

// Socket config object that prevents CORS conflicts

const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
};

const io = require('socket.io')(5000, options);

// When recieving a TCP connection to the port 5000:

io.on('connection', socket => {
    const id = socket.handshake.query.id;

    log(chalk.green("Connected client : ") + id);
    
    // Open & bind the socket stream to the proper client ID

    socket.join(id);
    
    // On 'send-message' event:

    socket.on('send-message', ({ recipients, text }) => {
        log(`\n🕊 'send-message' event triggered :\n[recipients] = ${recipients}\n[text] = ${text}\n`)
    
        // Iterate over recipients 

        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(recipientCandidate =>
                recipientCandidate !== recipient);
            newRecipients.push(id);
            log(newRecipients);
    
            // Broadcast message to recipent(s) over socket

            socket.broadcast.to(recipient).emit('recieve-message', {
                recipients: newRecipients, sender: id, text,
            })
            log(`✅ 'recieve-message' event emitted to ${recipient}`)
        })
        log('\n--------------------------------------------------------------------------');
    })
}
)