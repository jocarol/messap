import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

const Conversations = () => {
    const { conversations, selectConversationIndex } = useConversations();


    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                    action
                >
                    {conversation.recipients.map(recipient => recipient.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Conversations