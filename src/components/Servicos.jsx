import React from 'react';
import { FaCode, FaPalette, FaGraduationCap, FaUsers } from 'react-icons/fa';
import './Servicos.scss';

const servicos = [
  {
    titulo: 'Desenvolvimento Web',
    descricao: 'Criação de sites e sistemas web completos, desde landing pages até aplicações complexas com foco em performance e experiência do usuário.',
    icon: <FaCode />,
  },
  {
    titulo: 'Design & UI/UX',
    descricao: 'Design de interfaces modernas e identidade visual profissional. Criação de experiências digitais intuitivas e atrativas.',
    icon: <FaPalette />,
  },
  {
    titulo: 'Professor Particular',
    descricao: 'Aulas personalizadas de programação para iniciantes e profissionais que desejam aprimorar suas habilidades.',
    icon: <FaGraduationCap />,
  },
];

const Servicos = () => (
  <div className="servicos">
    <h2>Serviços</h2>
    <div className="servicos__grid">
      {servicos.map((servico, idx) => (
        <div className="servico" key={idx}>
          <div className="servico__icon">
            {servico.icon}
          </div>
          <h3>{servico.titulo}</h3>
          <p>{servico.descricao}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Servicos; 