import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SC from "soundcloud";

SC.initialize({
  client_id: '6tpb3vuq1phn',
});
SC.get('/user/creo/tracks').then(function(tracks){
  alert('Latest track: ' + tracks[0].title);
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
