import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer roboto p-5">
  
      <div className="container">
      <div className="col-lg-2 mb-4">
            <img src="/logo.svg" alt="Logo" width="50" />
          </div>
          <br />
        <div className="row">
          {/* Left Column - Logo & Navigation */}
          

          {/* Footer Links */}
          <div className="col-lg-8">
            <div className="row">
              {/* Hotel Section */}
              <div className="col-md-3 mb-4">
                <h6 className="fw-bold">Hotel</h6>
                <ul className="list-unstyled">
                  <li><a href="#">Updates</a></li>
                  <li><a href="#">Security</a></li>
                  <li><a href="#">Chrome Extension</a></li>
                </ul>
              </div>

              {/* Company Section */}
              <div className="col-md-3 mb-4">
                <h6 className="fw-bold">Company</h6>
                <ul className="list-unstyled">
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Join us</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>

              {/* Share Section */}
              <div className="col-md-3 mb-4">
                <h6 className="fw-bold">Share</h6>
                <ul className="list-unstyled">
                  <li><a href="#">Startup</a></li>
                  <li><a href="#">Capital</a></li>
                  <li><a href="#">Equity</a></li>
                </ul>
              </div>

              {/* Help Section */}
              <div className="col-md-3 mb-4">
                <h6 className="fw-bold">Help</h6>
                <ul className="list-unstyled">
                  <li><a href="#">Technical Support</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">System</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-lg-4">
            <h6 className="fw-bold">Sign up for the newsletter</h6>
            <div className="input-group">
              <input type="email" className="form-control rounded-0" placeholder="Enter your email" />
              <button className="btn btn-dark rounded-0">Get Started</button>
            </div>
          </div>
        </div>

        {/* Bottom Line & Terms */}
        <div className="mt-4 border-top border-dark pt-3 d-flex justify-content-between">
          <p>Terms and Condition Privacy Policy</p>
          <p>Terms and Condition Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
