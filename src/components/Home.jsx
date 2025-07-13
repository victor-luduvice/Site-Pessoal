import React from 'react';
import './Home.scss';

const Home = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      <h1>Victor Luduvice</h1>
      <div className="home__subtitle">Desenvolvedor Full Stack | UI/UX Designer | Aspirante a Educador</div>
      <p>
        Transformo ideias em soluções digitais que geram impacto e inovação.
      </p>
      <div className="home__cta">
        <button className="secondary" onClick={() => scrollToSection('contato')}>
          Entre em Contato
        </button>
      </div>
    </div>
  );
};

export default Home; 