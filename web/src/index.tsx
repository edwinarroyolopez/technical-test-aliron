import React, { useState, useRef } from "react";

import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* generals styles */
import "./assets/sass/general.sass";
import "./assets/css/navbar.css";
import "./assets/css/slick.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/venobox.css";
import "./assets/css/navbar.css";
import "./assets/css/navbutton.css";
import "./assets/css/banner.css";
import "./assets/css/festiveslider.css";
import "./assets/css/shedule.css";
import "./assets/css/upcoming.css";
import "./assets/css/gallery.css";
import "./assets/css/event.css";
import "./assets/css/pricing.css";
import "./assets/css/sponsor.css";
import "./assets/css/about-page.css";
import "./assets/css/pricingpahe.css";
import "./assets/css/sponsorpage.css";
import "./assets/css/comingsoon.css";
import "./assets/css/error-page.css";
import "./assets/css/footer.css";
import "./assets/css/responsive.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
