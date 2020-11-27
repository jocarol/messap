import React, { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

const Conversation = () => {
    const [textMessage, setTextMessage] = useState('');
    const { sendMessage, selectedConversation } = useConversations();

    // Callback used to target the last message as a ref, in order to
    // automatically scroll to the last message

    const setRef = useCallback(
        (node) => {
            node && node.scrollIntoView({ smooth: true });
        },
        [],
    )

    // Prevent default POST behaviour on submit event

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMessage(
            selectedConversation.recipients.map(recipient => recipient.id),
            textMessage
        );
        setTextMessage('');
    };

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column
                align-items-start justify-content-end px-3">
                    {
                    
                    // Maps conversation messages to divs that displays them
                    
                    selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        return (
                            <div
                    
                               // Perform a check wether the mapped message is the last of the
                                // selectedConversation array. If that's the case, then set its 'ref'
                                // attribute to 'setRef', so the viewport will be scrolled to the last message.
                    
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}</div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? "You" : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                // Message input & send button area 
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Conversation;
