
import React, { useContext, useState } from 'react';
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
export const ConversationsProvider = ({ id, children }) => {
    const [conversations, setConversations] = useLocalStorage('conversation', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();

    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    };

    const addMessageToConversation = ({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {
                        // LOG HERE WHAT THE FUCK IS '...CONVERSATION' LIKE
                        ...conversation,
                        messages: [...conversation.messages, newMessage],
                    }
                }
                return conversation;
            })

            if (madeChange) {
                return newConversations;
            } else {
                return [...prevConversations, { recipients, message: [newMessage] }]
            }
        });
    };

    const sendMessage = (recipients, text) => {
        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            })
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        })
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender;
            })
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe }
        })
        const selected = index === selectedConversationIndex;
        return { ...conversation, messages, recipients, selected }
    });

    const contextValue = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage,
    };

    console.log(formattedConversations[selectedConversationIndex]);
    return (
        <ConversationsContext.Provider value={contextValue}>
            {children}
        </ConversationsContext.Provider>
    )
}

const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    })

}