import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext();

export const useContacts = () => {
    return useContext(ContactsContext);
}

/**
 * Contextualized contact provider. The goal is to prevent the messy props drilling 
 * of the local storge fetching logic, from the app component, all the way down
 * to any component that requires it.sdfghjkm
 * @param {*} param0 
 */
export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    
    const createContact = (id, name) => {
        setContacts(prevContacts => {
            return [...prevContacts, {id, name}]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact}}>
            {children} 
        </ContactsContext.Provider>
    )
}
  