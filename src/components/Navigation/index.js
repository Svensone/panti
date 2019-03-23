import React from 'react';
import { NavLink as NavLinkRR } from 'react-router-dom';
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

// context & components
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

// styling with reactstrap
import { NavLink, NavItem, Button } from 'reactstrap';
import './style.css';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mnuShow: false };
    this.closeMnu = this.closeMnu.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", () => {
      console.log("begin", arguments);
      this.closeMnu();
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  toggleShow() {
    this.setState({ mnuShow: !this.state.mnuShow });
  }

  closeMnu() {
    if (this.state.mnuShow) {
      this.setState({ mnuShow: false });
    }
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    const show = this.state.mnuShow ? "show" : "";
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-dark fixed-top ${
          this.props.navBarShrink
        }`}
        id="mainNav"
      >
        <div className="container">
          <a
            onClick={this.scrollToTop.bind(this)}
            className="navbar-brand js-scroll-trigger"
            href="#page-top"
          >
            Panti
          </a>
          <button
            onClick={this.toggleShow.bind(this)}
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars" />
          </button>
          <div
            className={`collapse navbar-collapse ${show}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
                <NavLink
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  tag={NavLinkRR}
                  to={ROUTES.HOME}
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  tag={NavLinkRR}
                  to={ROUTES.ADMIN}
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Admin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  tag={NavLinkRR}
                  to={ROUTES.ACCOUNT}
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  tag={NavLinkRR}
                  to={ROUTES.LANDING}
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Landing
                </NavLink>
              </li>
              <NavItem>
                <SignOutButton />
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mnuShow: false };
    this.closeMnu = this.closeMnu.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", () => {
      console.log("begin", arguments);
      this.closeMnu();
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  toggleShow() {
    this.setState({ mnuShow: !this.state.mnuShow });
  }

  closeMnu() {
    if (this.state.mnuShow) {
      this.setState({ mnuShow: false });
    }
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    const show = this.state.mnuShow ? "show" : "";
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-dark fixed-top ${
          this.props.navBarShrink
        }`}
        id="mainNav"
      >
        <div className="container">
          <a
            onClick={this.scrollToTop.bind(this)}
            className="navbar-brand js-scroll-trigger"
            href="#page-top"
          >
            Panti
          </a>
          <button
            onClick={this.toggleShow.bind(this)}
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars" />
          </button>
          <div
            className={`collapse navbar-collapse ${show}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
                <Link
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  to="signin"
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Sign-In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  to="timeline"
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Timeline
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  to="team"
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  className="nav-link js-scroll-trigger"
                  to="contact"
                  spy={true}
                  smooth="easeInOutQuart"
                  duration={1000}
                >
                  Contact
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
