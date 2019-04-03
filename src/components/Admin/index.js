import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './style.css';

const AdminPage = () => (
  <div className="admin-main" >
    <h1> Admin </h1>
    <p> The Admin Page is visible to everyone </p>

    <Switch>
      <Route exact path={ROUTES.ADMIN} component={UserList} className="userlist"  />
      <Route
        exact
        path={ROUTES.ADMIN_DETAILS}
        component={UserDetail}
      />
    </Switch>
  </div>
);

class UserListBase extends React.Component {
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

      const userList = Object.keys(userObj).map(key => ({
        ...userObj[key],
        uid: key,
      }));

      this.setState({
        users: userList,
        loading: false,
      });
    });
  }

  // turn off listener on() to avoid memory leaks
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div >
        <h2>Users</h2>
        {loading && <div> Loading ... </div>}

        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong> ID: </strong> {user.uid}
              </span>
              <span>
                <strong> Username: </strong> {user.username}
              </span>
              <span>
                <strong> Email: </strong> {user.email}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const UserDetail = ({ match }) => (
  <div className="userdetail">
    <h2> User ({match.params.id}) </h2>
  </div>
);


const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

const UserList = withFirebase(UserListBase);

export default compose(withAuthorization(condition))(AdminPage);
