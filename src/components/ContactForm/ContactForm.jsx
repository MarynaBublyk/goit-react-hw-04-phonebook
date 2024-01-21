import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { ReactComponent as AddIcon } from '../icons/add.svg';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // Генерація унікальних ідентифікаторів для полів форми
  nameInputId = nanoid();
  numberInputId = nanoid();

  // Обрабка відправки форми
  handleSubmit = event => {
    event.preventDefault();

    //Виклик функції onSubmit із батьківського компонента з передачею об'єкта контакта
    this.props.onSubmit({
      name: this.state.name.trim(),
      number: this.state.number.trim(),
    });

    // Сброс стану форми
    this.reset();
  };

  // Обробка зміни значень полів форми
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Сброс стану форми
  reset = () => {
    this.setState({ number: '', name: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameInputId}>
          Name
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я\s'\-]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label htmlFor={this.numberInputId}>
          Number
          <Input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="[0-9\-\(\)\+\s]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">
          <AddIcon fill="#f08080" width="25" height="25" />
          Add contact
        </Button>
      </Form>
    );
  }
}

export default ContactForm;
