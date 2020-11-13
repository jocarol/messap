import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

const NewConversationModal = ({ closeModal }) => {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        createConversation(setSelectedContactIds);
        closeModal();
    }

    const handleCheckBoxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(idToRemove => {
                    return idToRemove !== contactId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Select contacts</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckBoxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Create Conversation</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewConversationModal;
