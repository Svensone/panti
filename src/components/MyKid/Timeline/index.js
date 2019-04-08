import React from "react";
import "./style.css";

// import img
import pic1 from './img/1.jpg';
import pic2 from './img/2.jpg';
import pic3 from './img/3.jpg';
import pic4 from './img/4.jpg';

export const Timeline = props => {
  return (
    <section className="timeline-main" id="timeline-main">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">My Life</h2>
            <h3 className="section-subheading text-muted">
              from then 'till now
            </h3>
          </div>
        </div>
        <div className="row">
          <ul className="timeline">
            <li>
                <div className="timeline-image">
                <img src={pic1} alt="" className="rounded-circle img-fluid"/>
                </div>
                <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2004</h4>
                  <h4 className="subheading">Born in Yeh Sumbul</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">I'm the second oldest in my Family. I have two more younger sibilings</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={pic2} alt=""/>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>July 2010 </h4>
                  <h4 className="subheading">Elementary School</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted"> Starting my education </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={pic3} alt=""/>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4> 2015 </h4>
                  <h4 className="subheading">Moving to orphanage Alas Kasih</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">since my parents could not provide for me anymore</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={pic4} alt=""/>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2019</h4>
                  <h4 className="subheading">you becoming my sponsor</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                  thank you so much ! forever grateful since you giving me a bright future 
                  I will study even harder now because your help gives me hope.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>only
                  <br />God
                  <br/>knows</h4>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </section>
  );
};
