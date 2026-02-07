import React from 'react';
import './Sobre.scss';

const Sobre = () => (
  <div className="sobre">
    <h2>Sobre Mim</h2>
    <div className="sobre__texto">
      <p>
        Sou um desenvolvedor full stack com uma trajetória que une tecnologia, arte e educação. Minha jornada profissional começou em áreas como atendimento e administração, o que me deu uma base sólida em <strong>comunicação, organização e empatia</strong>, habilidades que hoje são essenciais na criação de soluções digitais.
      </p>
      <p>
        Atualmente, meu foco é o desenvolvimento de aplicações completas, do front-end ao back-end, com um interesse crescente em análise de dados. Guiado pela minha formação em Análise e Desenvolvimento de Sistemas e por uma curiosidade constante, busco criar produtos que não sejam apenas funcionais, mas também <strong>visualmente atraentes e intuitivos</strong>. Acredito na tecnologia como uma poderosa ferramenta para transformação e compartilhamento de conhecimento.
      </p>
      <p>
        Estou sempre em busca de oportunidades para colaborar em projetos que valorizem a <strong>inovação, o aprendizado contínuo e o impacto positivo</strong>. Estou pronto para aplicar minha criatividade e minhas habilidades técnicas para construir soluções eficientes em ambientes dinâmicos e colaborativos.
      </p>
    </div>
    <h3>Minhas Habilidades</h3>
    <div className="sobre__skills">
      <div className="skill-category">
        <h4>Frontend</h4>
        <ul>
          <li>React & React Native</li>
          <li>JavaScript & TypeScript</li>
          <li>HTML5 & CSS3</li>
          <li>Sass & Styled Components</li>
        </ul>
      </div>
      <div className="skill-category">
        <h4>Backend</h4>
        <ul>
          <li>Node.js & Express</li>
          <li>Java & SpringBoot</li>
          <li>APIs RESTful</li>
        </ul>
      </div>
      <div className="skill-category">
        <h4>Design</h4>
        <ul>
          <li>UI/UX Design</li>
          <li>Identidade Visual</li>
        </ul>
      </div>
      <div className="skill-category">
        <h4>Banco de Dados</h4>
        <ul>
          <li>MySQL & PostgreSQL</li>
          <li>MongoDB </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Sobre;