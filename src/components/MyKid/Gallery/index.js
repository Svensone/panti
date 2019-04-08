import React from 'react';
import { Row, Col, Container, Card } from 'reactstrap';
import InstagramEmbed from 'react-instagram-embed';

import './style.css';

export const SocialMedia = props => {
  return (
    <section className="instagram">
    <Container className="intro">
    <div className="text-center">
    <h1 className="intro-heading">
    See what I'm up to</h1>
    <p> let's keep in touch ✌️ </p>
    <hr/>
    <div className="text-center">
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
    </div>
    
    </Container>
      <Container className="container posts">
        <div>
          <Row className="">
            <Col md="4">
              <Card className="mb-4 shadow-sm">
                <InstagramEmbed
                  url="https://www.instagram.com/p/BqH2ZikAg8o/"
                  maxWidth={500}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-4 shadow-sm">
                <InstagramEmbed
                  url="https://www.instagram.com/p/BqDkShkgQCV/"
                  maxWidth={500}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-4 shadow-sm">
                <InstagramEmbed
                  url="https://www.instagram.com/p/BJEzzArhH3l/"
                  maxWidth={500}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};
