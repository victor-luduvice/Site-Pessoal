import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css';
import './components/Home/Home.scss';
import './components/Sobre/Sobre.scss';
import './components/Projetos/Projetos.scss';
import './components/Servicos/Servicos.scss';
import './components/Contato/Contato.scss';
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
