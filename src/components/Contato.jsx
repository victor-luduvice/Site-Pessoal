import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import './Contato.scss';

const Contato = () => (
  <div className="contato">
    <h2>Contato</h2>
    <p>Entre em contato pelas redes sociais ou envie uma mensagem pelo formulário abaixo. Estou sempre aberto a novos projetos e oportunidades.</p>
    
    <ul className="contato__redes">
      <li>
        <a href="https://github.com/Victor-Luduvice" target="_blank" rel="noopener noreferrer">
          <FaGithub />
          GitHub
        </a>
      </li>
      <li>
        <a href="https://linkedin.com/in/VictorLuduvice" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
          LinkedIn
        </a>
      </li>
      <li>
        <a href="https://instagram.com/igviictor" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
          Instagram
        </a>
      </li>
      <li>
        <a href="mailto:contatovct@outlook.com">
          <FaEnvelope />
          E-mail
        </a>
      </li>
    </ul>
    
    <form className="contato__form">
      <input type="text" placeholder="Seu nome" required />
      <input type="email" placeholder="Seu e-mail" required />
      <textarea placeholder="Sua mensagem" required></textarea>
      <button type="submit">Enviar Mensagem</button>
    </form>
  </div>
);

export default Contato; 