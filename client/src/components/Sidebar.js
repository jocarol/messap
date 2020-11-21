import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Contacts from './Contacts';
import ConversationsList from './ConversationsList';
import NewContactModal from './NewContactModal';
import NewConversationsModal from './NewConversationModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

const Sidebar = ({ id }) => {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const [isModalOpen, setModalOpen] = useState(false);
    const isMessageOpen = (activeKey === CONVERSATIONS_KEY);

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Messages</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <ConversationsList />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your ID: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {isMessageOpen ? 'conversation' : 'contact'}
                </Button>
            </Tab.Container>
            <Modal show={isModalOpen} onHide={closeModal} >
                {isMessageOpen ?
                    <NewConversationsModal closeModal={closeModal} /> :
                    <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
}

export default Sidebar
