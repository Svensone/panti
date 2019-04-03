import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

// styles
import './style.css';

import { Header } from '../BasicComponents/Header';
import { Timeline } from '../BasicComponents/Timeline';
import ContactForm from '../BasicComponents/Contact';
import { Team } from '../BasicComponents/Team';

const Home = () => (
  <div>
    <Header />
    <Messages />
    <Timeline />
    <Team />
    <ContactForm />
  </div>
);

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {

        const messageList = Object.keys(messageObject).map(message => ({
          ...messageObject(message),
          uid: message
        }))
        this.setState({
          loading: false,
        messages: messageList });
      } else {
        this.setState({ message: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { loading, messages } = this.state;
    return (
      <div>
        {loading && <div> Loading ... </div>}
        {messages ? (
          <MessageList messages={messages} />
        ) : (
          <div> no messages at the moment </div>
        )}
      </div>
    );
  }
}

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </ul>
);

const MessageItem = message => (
  <li>
    <strong> {message.userId} </strong> {message.text}
  </li>
);

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
