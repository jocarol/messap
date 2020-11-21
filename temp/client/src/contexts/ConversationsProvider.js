
import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export const useConversations = () => {
    return useContext(ConversationsContext);
}

/**
 * Contextualized conversation provider. The goal is to prevent the messy props drilling 
 * of the local storge fetching logic, from the app component, all the way down
 * to any component that requires it.
 * @param {*} param0 
 */
export const ConversationsProvider = ({ children }) => {
    const [conversations, setConversations] = useLocalStorage('conversation', []);
    const { contacts } = useContacts();

    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    };

    const formattedConversations = conversations.map(conversation => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            })
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        })
        return { ...conversation, recipients }
    });

    const contextValue = {
        conversations: formattedConversations,
        createConversation,
    };

    return (
        <ConversationsContext.Provider value={contextValue}>
            {children}
        </ConversationsContext.Provider>
    )
}
