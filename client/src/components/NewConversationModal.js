import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

const NewConversationModal = ({ closeModal }) => {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleSubmit = (e) => {
        // Prevent default POST behaviour on submit event
        e.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    /**
     * Handler used to update the selected contacts list
     * stored in the component's state value. Takes a contact ID
     * in input. If the contactact ID is already present in the state,
     * it will be removed. If not, it will be added.
     * @param {String} contactId 
     */
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
                    {
                        // We map each contact of the contacts array to output a
                        // corersponding form field. 
                        contacts.map(contact => (
                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check
                                    type="checkbox"
                                    // Check if the checkbox should be rendered as checked
                                    value={selectedContactIds.includes(contact.id)}
                                    label={contact.name}
                                    onChange={() => handleCheckBoxChange(contact.id)}
                                />
                            </Form.Group>
                        ))
                    }
                    <Button type="submit">Create Conversation</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewConversationModal;
