import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';

// styles
import './style.css';

import { Header } from '../BasicComponents/Header';
import { Timeline } from '../BasicComponents/Timeline';
import ContactForm from '../BasicComponents/Contact';
import { Team } from '../BasicComponents/Team';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({ users: snapshot.val() });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <Header />
        <Messages users={this.state.users} />
        <Timeline />
        <Team />
        <ContactForm />
      </div>
    );
  }
}

class MessagesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      text: '',
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenerForMessages();
  }

  onListenerForMessages() {
    this.setState({ loading: true });
    this.props.firebase
      .texts()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
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
      email: authUser.email,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.setState({ text: '' });
    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.text(uid).remove();
  };

  onEditMessage = (message, text) => {
    this.props.firebase.text(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenerForMessages,
    );
  };

  render() {
    const { users } = this.props;
    const { loading, messages, text } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="section message-board">
            {loading && <div> Loading ... </div>}
            {messages ? (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onRemoveMessage={this.onRemoveMessage}
                onEditMessage={this.onEditMessage}
              />
            ) : (
              <div> no messages at the moment </div>
            )}
            {!loading && messages && (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.onNextPage}
              >
                More
              </button>
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
              <button className="btn btn-primary" type="submit">
                Send
              </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({
  messages,
  onRemoveMessage,
  onEditMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
);

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>
              {message.user.username || message.user.userId}{' '}
            </strong>{' '}
            {message.text}
            {message.editedAt && <span> (Edited) </span>}
          </span>
        )}

        {!editMode && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Delete
          </button>
        )}
        {editMode ? (
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSaveEditText}
            >
              Save
            </button>
            <button
              className="btn btn-primary"
              onClick={this.onToggleEditMode}
            >
              Reset
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={this.onToggleEditMode}
          >
            Edit
          </button>
        )}
      </li>
    );
  }
}

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),)
  (Home);
