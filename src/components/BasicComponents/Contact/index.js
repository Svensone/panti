import React, { Component } from 'react';
import { compose } from 'recompose';

import './style.css';
import { withFirebase } from '../../Firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
  error: null,
};

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { name, email, phone, message } = this.state;
    this.props.firebase
      .add({
        name,
        email,
        phone,
        message,
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });

    this.setState({...INITIAL_STATE})
    event.preventDefault();
  };

  render() {
    const { name, email, phone, message } = this.state;
    return (
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">
                Contact Us
              </h2>
              <h3 className="section-subheading text-muted">
                Lorem ipsum dolor sit amet consectetur.
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form
                id="contactForm"
                name="sentMessage"
                onSubmit={this.onSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Your Name *"
                      />
                      <p className="help-block text-danger" />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.onChange}
                        type="email"
                        placeholder="Your Email *"
                      />
                      <p className="help-block text-danger" />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="phone"
                        id="phone"
                        type="tel"
                        placeholder="Your Phone *"
                        value={phone}
                        onChange={this.onChange}
                      />
                      <p className="help-block text-danger" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        value={message}
                        onChange={this.onChange}
                        placeholder="Your Message *"
                      />
                      <p className="help-block text-danger" />
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-lg-12 text-center">
                    <div id="success" />
                    <button
                      id="sendMessageButton"
                      className="btn btn-primary btn-xl text-uppercase"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const ContactForm = compose(withFirebase)(Contact);

export default ContactForm;
