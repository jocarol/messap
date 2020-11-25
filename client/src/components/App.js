import React from 'react';
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  /**
   * Get user Id from the client local storage if any.
   */
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  /**
   * If Id is not 'undefined', render the Dashboard component,
   * with the user ID in props. If not, render the Login component.
   */
  return (
    id ? dashboard : <Login setId={setId} />
  )
}

export default App;
