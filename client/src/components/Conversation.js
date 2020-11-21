import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

const Conversation = () => {
    console.log(useConversations());
    const [textMessage, setTextMessage] = useState('');
    const [sendMessage, selectedConversation] = useConversations();

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map(recipient => recipient.id), textMessage)
    };

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">

            </div>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            requires
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
