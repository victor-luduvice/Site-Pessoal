/**
 * ====================================
 * COMPONENTE: App
 * ====================================
 * Componente principal (Root) da aplicação React
 * 
 * RESPONSABILIDADES:
 * - Estrutura geral do site
 * - Navbar/Menu de navegação
 * - Importar e renderizar todos os componentes
 * - Gerenciar scroll suave entre seções
 * - Redes sociais do desenvolvedor
 * 
 * ESTRUTURA:
 * ├── Navbar
 * │   ├── Menu de navegação (Início, Sobre, Projetos, Serviços, Contato)
 * │   ├── Redes sociais (GitHub, LinkedIn, Instagram, WhatsApp)
 * │   └── Logo/Brand
 * │
 * └── Main (Conteúdo Principal)
 *     ├── Home (Seção inicial)
 *     ├── Sobre (Sobre mim)
 *     ├── Projetos (Portfólio)
 *     ├── Serviços (O que ofereço)
 *     └── Contato (Formulário + Redes Sociais)
 * 
 * DEPENDÊNCIAS:
 * - react-icons: Ícones vetoriais
 * - AOS (Animate On Scroll): Animações ao scrollar
 */

import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Home from './components/Home/Home';
import Sobre from './components/Sobre/Sobre';
import Projetos from './components/Projetos/Projetos';
import Servicos from './components/Servicos/Servicos';
import Contato from './components/Contato/Contato';
import './styles/App.css';

function App() {
  /**
   * scrollToSection: Realiza scroll suave até uma seção específica
   * 
   * FUNCIONAMENTO:
   * 1. Procura elemento com id correspondente no DOM
   * 2. Se encontrou, faz scroll suave até ele
   * 3. Usado pelos botões da navbar para navegação
   * 
   * @param {string} sectionId - ID da seção (ex: 'home', 'sobre', 'contato')
   */
  const scrollToSection = (sectionId) => {
    // Busca o elemento com o id especificado
    const element = document.getElementById(sectionId);
    
    // Se encontrou o elemento
    if (element) {
      // Scroll suave até ele
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ====== NAVBAR / HEADER ====== */}
      {/* Menu de navegação e links de redes sociais */}
      <header className="navbar">
        <nav>
          {/* Logo/Brand da aplicação */}
          <div className="nav-brand">
            <span></span>
          </div>

          {/* ====== MENU DE NAVEGAÇÃO ====== */}
          {/* Links para as diferentes seções */}
          <ul className="nav-menu">
            <li><button onClick={() => scrollToSection('home')}>Início</button></li>
            <li><button onClick={() => scrollToSection('sobre')}>Sobre</button></li>
            <li><button onClick={() => scrollToSection('projetos')}>Projetos</button></li>
            <li><button onClick={() => scrollToSection('servicos')}>Serviços</button></li>
            <li><button onClick={() => scrollToSection('contato')}>Contato</button></li>
          </ul>

          {/* ====== REDES SOCIAIS ====== */}
          {/* Links para redes sociais e contato direto */}
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
            <a href="https://wa.me/5579998333341" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </nav>
      </header>
      
      {/* ====== CONTEÚDO PRINCIPAL ====== */}
      {/* 
        Todas as seções são identificadas com id único
        para que a navegação (scrollToSection) funcione
        
        data-aos="fade-up" ativa animação ao scrollar
        (biblioteca AOS)
      */}
      <main>
        {/* SEÇÃO 1: HOME / INÍCIO */}
        <section id="home" data-aos="fade-up">
          {/* Elementos decorativos de fundo */}
          <div className="home-bg-container">
            {/* Partículas animadas */}
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
            
            {/* Formas de wireframe */}
            <div className="wireframe-shape shape-a"></div>
            <div className="wireframe-shape shape-b"></div>
            
            {/* Linhas flutuantes */}
            <div className="floating-line line-1"></div>
            <div className="floating-line line-2"></div>
            <div className="floating-line line-3"></div>
          </div>
          {/* Componente Home - Apresentação pessoal */}
          <Home />
        </section>

        {/* SEÇÃO 2: SOBRE */}
        <section id="sobre" data-aos="fade-up">
          {/* Componente Sobre - Informações pessoais */}
          <Sobre />
        </section>

        {/* SEÇÃO 3: PROJETOS */}
        <section id="projetos" data-aos="fade-up">
          {/* Componente Projetos - Portfólio */}
          <Projetos />
        </section>

        {/* SEÇÃO 4: SERVIÇOS */}
        <section id="servicos" data-aos="fade-up">
          {/* Componente Serviços - O que ofereço */}
          <Servicos />
        </section>

        {/* SEÇÃO 5: CONTATO ⭐ */}
        <section id="contato" data-aos="fade-up">
          {/* Componente Contato - Formulário + Redes sociais */}
          <Contato />
        </section>
      </main>
    </>
  );
}

export default App;
