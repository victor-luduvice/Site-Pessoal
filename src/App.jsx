import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import Home from './components/Home';
import Sobre from './components/Sobre';
import Projetos from './components/Projetos';
import Servicos from './components/Servicos';
import Contato from './components/Contato';
import './App.css';

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar">
        <nav>
          <div className="nav-brand">
            <span></span>
          </div>
          <ul className="nav-menu">
            <li><button onClick={() => scrollToSection('home')}>Início</button></li>
            <li><button onClick={() => scrollToSection('sobre')}>Sobre</button></li>
            <li><button onClick={() => scrollToSection('projetos')}>Projetos</button></li>
            <li><button onClick={() => scrollToSection('servicos')}>Serviços</button></li>
            <li><button onClick={() => scrollToSection('contato')}>Contato</button></li>
          </ul>
          <div className="nav-social">
            <a href="https://github.com/Victor-Luduvice" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/victor-luduvice-7b4827264/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/igviictor" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:contatovct@outlook.com">
              <FaEnvelope />
            </a>
          </div>
        </nav>
      </header>
      
      <main>
        <section id="home" data-aos="fade-up">
          <div className="home-bg-container">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="wireframe-shape shape-a"></div>
            <div className="wireframe-shape shape-b"></div>
            <div className="floating-line line-1"></div>
            <div className="floating-line line-2"></div>
            <div className="floating-line line-3"></div>
          </div>
          <Home />
        </section>
        <section id="sobre" data-aos="fade-up">
          <Sobre />
        </section>
        <section id="projetos" data-aos="fade-up">
          <Projetos />
        </section>
        <section id="servicos" data-aos="fade-up">
          <Servicos />
        </section>
        <section id="contato" data-aos="fade-up">
          <Contato />
        </section>
      </main>
    </>
  );
}

export default App;
