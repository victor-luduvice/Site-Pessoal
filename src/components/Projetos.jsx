import React from 'react';
import './Projetos.scss';

const Projetos = () => {
  const projetos = [
    {
      id: 1,
      titulo: " Caju E-commerce ",
      descricao: "Plataforma completa de e-commerce com React, Node.js e MongoDB. Inclui sistema de pagamentos, gestão de produtos e painel administrativo.",
      tecnologias: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://github.com/Victor-Luduvice/caju-ecommerce",
      imagem: "public/imgSiteCaju.png"
    },
    {
      id: 2,
      titulo: "ToDoList App",
      descricao: "Aplicação de gestão de tarefas com interface moderna e funcionalidades avançadas.",
      tecnologias: ["Vue.js", "Firebase", "Vuex", "Vuetify"],
      link: "https://github.com/Victor-Luduvice/projeto2",
      imagem: "public/imgTaskList.png"
    },
    {
      id: 3,
      titulo: "Conectfy",
      descricao: " Startup Sendo desenvolvida! terá o objetivo de conectar ideias e transformar sonhos em realidade.",
      tecnologias: ["React", "Sass", "Vite", "Node.js", "Express", "MongoDB", "Firebase"],
      link: "https://github.com/Victor-Luduvice/conectfy",
      imagem: "public/imgConect.png"
    }
  ];

  return (
    <div className="projetos">
      <div className="projetos__header">
        <h2>Projetos</h2>
        <p>Alguns dos meus trabalhos mais recentes e relevantes</p>
      </div>
      
      <div className="projetos__grid">
        {projetos.map((projeto) => (
          <div key={projeto.id} className="projeto-card" data-aos="fade-up" data-aos-delay={projeto.id * 100}>
            <div className="projeto-card__image">
              <img src={projeto.imagem} alt={projeto.titulo} />
              <div className="projeto-card__overlay">
                <a href={projeto.link} target="_blank" rel="noopener noreferrer" className="projeto-card__link">
                  Ver Projeto
                </a>
              </div>
            </div>
            <div className="projeto-card__content">
              <h3>{projeto.titulo}</h3>
              <p>{projeto.descricao}</p>
              <div className="projeto-card__tech">
                {projeto.tecnologias.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projetos; 