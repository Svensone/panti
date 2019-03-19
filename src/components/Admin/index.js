import React from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      // convert the userObj into array for easier display later
      const userObj = snapshot.val();
      console.log(userObj)
      const userList = Object.keys(userObj).map(key => ({
        ...userObj[key],
        uid: key,
      }));
      console.log(userList)
      this.setState({
        users: userList,
        loading: false,
      });
    });
  }

  // turn off listener on() to avoid memory leaks
  componentWillUnmount(){
    this.props.firebase.users().off();
  }
  

  render(){
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>

        {loading && <div> Loading ... </div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({users}) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
      <span> <strong> ID: </strong> {user.uid} </span>
      <span> <strong> Username: </strong> {user.username} </span>
      <span> <strong> Email: </strong> {user.email} </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
