const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
};

const io = require('socket.io')(5000, options);

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    console.log(`Connected client : ${id}`);
    socket.join(id);
    socket.on('send-message', ({ recipients, text }) => {
        console.log(`send-message event triggered : recipients = ${recipients} | text = ${text}`)
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(recipientCandidate =>
                recipientCandidate !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('recieve-message', {
                recipients: newRecipients, sender: id, text
            })
            console.log(`recieve-message event emitted to ${recipient}`)
        })
    })
}
)