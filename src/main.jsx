import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './components/Home.scss';
import './components/Sobre.scss';
import './components/Projetos.scss';
import './components/Servicos.scss';
import './components/Contato.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-out-cubic',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
