import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';

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
      text: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.texts().on('value', snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {
        const messageList = Object.keys(messageObject).map(
          message => ({
            ...messageObject[message],
            uid: message,
          }),
        );
        this.setState({
          loading: false,
          messages: messageList,
        });
      } else {
        this.setState({ message: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.texts().off();
  }

  onChangeText = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.texts().push({
      text: this.state.text,
      userId: authUser.uid,
      email: authUser.email
    });
    this.setState({ text: '' });
    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.text(uid).remove();
  }

  render() {
    const { loading, messages, text } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="section message-board">
            {loading && <div> Loading ... </div>}
            {messages ? (
              <MessageList
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
              />
            ) : (
              <div> no messages at the moment </div>
            )}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                name="text"
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button className="btn btn-primary" type="submit"> Send </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({ messages, onRemoveMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem 
      key={message.uid} 
      message={message}
      onRemoveMessage={onRemoveMessage} />
    ))}
  </ul>
);

const MessageItem = ({ message, onRemoveMessage }) => (
  <li>
    <strong> {message.userId} </strong> {message.text}
    <button
    className="btn btn-primary"
    type="button"
    onClick={() => onRemoveMessage(message.uid)} > Delete </button>
  </li>
);

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
