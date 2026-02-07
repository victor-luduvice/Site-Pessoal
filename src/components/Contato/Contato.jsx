/**
 * ====================================
 * COMPONENTE: Contato
 * ====================================
 * Componente responsável pela seção de contato
 * 
 * FUNÇÕES PRINCIPAIS:
 * - Exibir formulário de contato
 * - Gerenciar estado do formulário
 * - Enviar dados para o backend
 * - Mostrar feedback ao usuário
 * - Listar redes sociais do usuário
 * 
 * CAMPOS DO FORMULÁRIO:
 * - Nome (obrigatório)
 * - Email (obrigatório)
 * - Mensagem (obrigatório)
 * 
 * ENDPOINT BACKEND:
 * POST http://localhost:3000/enviar-mensagem
 * 
 * FLUXO DE FUNCIONAMENTO:
 * 1. Usuário preenche o formulário
 * 2. Ao clicar em "Enviar", handleSubmit é chamado
 * 3. Dados são validados no frontend
 * 4. Requisição é enviada para o backend
 * 5. Backend salva no MongoDB e envia email
 * 6. Feedback é exibido ao usuário
 * 7. Formulário é limpo se bem-sucedido
 */

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './Contato.scss';

const Contato = () => {
  // ====== ESTADOS ======
  // Armazena o nome do remetente
  const [name, setName] = useState('');
  
  // Armazena o email do remetente
  const [email, setEmail] = useState('');
  
  // Armazena a mensagem
  const [message, setMessage] = useState('');
  
  // Controla o estado de carregamento (durante o envio)
  const [loading, setLoading] = useState(false);
  
  // Armazena mensagens de feedback para o usuário
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // ====== FUNÇÕES ======

  /**
   * handleSubmit: Processa o envio do formulário
   * 
   * FLUXO:
   * 1. Previne comportamento padrão (recarregar página)
   * 2. Valida se todos os campos estão preenchidos
   * 3. Ativa estado de carregamento
   * 4. Envia dados para o backend via POST
   * 5. Processa a resposta
   * 6. Exibe feedback ao usuário
   * 7. Limpa o formulário se bem-sucedido
   * 
   * @param {Event} event - Evento do formulário
   */
  const handleSubmit = async (event) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    // ====== VALIDAÇÃO ======
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !message) {
      setFeedbackMessage('Por favor, preencha todos os campos.');
      return;
    }

    // ====== PREPARE PARA ENVIO ======
    // Ativa o estado de carregamento (desabilita botão, mostra "Enviando...")
    setLoading(true);
    // Limpa mensagens anteriores
    setFeedbackMessage('');

    // ====== CONFIGURAÇÃO DO SERVIDOR ======
    // URL do endpoint do backend que vai receber os dados
    const backendUrl = 'http://localhost:3000/enviar-mensagem';

    try {
      // ====== ENVIAR REQUISIÇÃO ======
      // Faz uma requisição POST para o backend com os dados do formulário
      const response = await fetch(backendUrl, {
        method: 'POST', // Método HTTP para enviar dados
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando JSON
        },
        body: JSON.stringify({ name, email, message }), // Converte os dados para JSON
      });

      // ====== PROCESSAR RESPOSTA ======
      // Converte a resposta em JSON
      const data = await response.json();

      // Verifica se a requisição foi bem-sucedida (status 2xx)
      if (response.ok) {
        // Mensagem de sucesso
        setFeedbackMessage('Mensagem enviada com sucesso!');
        
        // Limpa os campos após o envio bem-sucedido
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Mensagem de erro do servidor
        setFeedbackMessage(`Erro ao enviar: ${data.message || 'Ocorreu um erro.'}`);
      }
    } catch (error) {
      // ====== TRATAMENTO DE ERROS ======
      // Erros de conexão, timeout, etc.
      console.error('Erro ao enviar mensagem:', error);
      setFeedbackMessage('Ocorreu um erro ao enviar a mensagem. Verifique sua conexão.');
    } finally {
      // ====== FINALIZAÇÃO ======
      // Desativa o estado de carregamento, mesmo se houver erro
      // Isso enable o botão novamente
      setLoading(false);
    }
  };

  return (
    <div className="contato">
      <h2>Contato</h2>
      <p>Entre em contato pelas redes sociais ou envie uma mensagem pelo formulário abaixo. Estou sempre aberto a novos projetos e oportunidades.</p>

      {/* ====== REDES SOCIAIS ====== */}
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
          <a href="https://wa.me/5579998333341" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
            WhatsApp
          </a>
        </li>
      </ul>

      {/* ====== FORMULÁRIO CONTATO ====== */}
      {/* 
        Este formulário coleta:
        - Nome do visitante
        - Email do visitante
        - Mensagem/Descrição
        
        Ao enviar, os dados são validados e enviados para o backend
      */}
      <form className="contato__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={name} // Valor controlado pelo estado
          onChange={(e) => setName(e.target.value)} // Atualiza estado ao digitar
          required
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email} // Valor controlado pelo estado
          onChange={(e) => setEmail(e.target.value)} // Atualiza estado ao digitar
          required
        />
        <textarea
          placeholder="Sua mensagem"
          value={message} // Valor controlado pelo estado
          onChange={(e) => setMessage(e.target.value)} // Atualiza estado ao digitar
          required
        ></textarea>
        {/* Botão desabilitado enquanto a requisição está sendo enviada */}
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>

      {/* ====== FEEDBACK AO USUÁRIO ====== */}
      {/* Exibe mensagem de sucesso ou erro, se houver */}
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
    </div>
  );
};

export default Contato;