import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  // Значення вилучається із localStorage браузера с ключем 'contacts'
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts; //Якщо значення не знайдено, встановлюється значення масива phoneContacts.
  });

  const [filter, setFilter] = useState('');

  // При зміні стану contacts зберігає поточні контакти в localStorage з ключем 'contacts'.
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // // Збереження контактів в
  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts'); //Отримуємо дані з localStorage.
  //   const parsedContacts = JSON.parse(contacts); // Змінюємо дані зі строки JSON в объект JavaScript.

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts }); // Вставляємо отримані контакти в об'єкт "contacts".
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     // Порівнюємо поточні контакти с попереднім об'єктом контактів.
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //     // Якщо контакти змінились, зберігаємо їх в localStorage.
  //   }
  // }

  // Додаємо новий контакт в список контактів
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    // Якщо такий котакт вже існує, то виводимо повідомлення
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  // Зміна значення фільтра
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  // Отримання відфільтрованих контактів
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Видалення контакта зі списку
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactForm onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        // Фільтр для відображення контактів
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        // Список контактів
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
};

export default App;
