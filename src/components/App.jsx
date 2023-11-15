import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';


//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const storageContacts = localStorage.getItem('contacts');
//    const parsedContacts = JSON.parse(storageContacts);
//     if (parsedContacts) {
//       setContacts(() => parsedContacts);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

  
const LOCAL_STORAGE_KEY = 'contacts';
const initContacts =  [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]
const storageContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initContacts;

export function App() {
  const [contacts, setContacts] = useState(storageContacts);
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)),
    [contacts]
  );

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const addContact = data => {
    if (contacts.find(({ name }) => name === data.name)) {
      return alert(`${data.name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number,
      };
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const handleFilter = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const visibleContacts = () => {
    if (filter) {
      return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
    } else {
      return contacts;
    }
  };

  const filteredContacts = visibleContacts();

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm addContact={addContact} />
      <Filter filter={filter} onChange={handleFilter} />
      <h2>Contacts</h2>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
