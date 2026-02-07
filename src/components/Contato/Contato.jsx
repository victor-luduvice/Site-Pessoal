import React, { useState } from 'react'; // Importe useState
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import './Contato.scss';

const Contato = () => {
  // 1. Define estados para cada campo do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Para desabilitar o botão enquanto envia
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Para feedback ao usuário

  // 2. Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // MUITO IMPORTANTE: Previne o comportamento padrão do formulário (recarregar a página)

    // Validação básica (React)
    if (!name || !email || !message) {
      setFeedbackMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ativa o estado de carregamento
    setFeedbackMessage(''); // Limpa mensagens anteriores

    const backendUrl = 'http://localhost:3000/enviar-mensagem'; // Seu endpoint do backend

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }), // Envia os dados do estado
      });

      const data = await response.json(); // Pega a resposta JSON do backend

      if (response.ok) { // Verifica se a requisição foi bem-sucedida (status 2xx)
        setFeedbackMessage('Mensagem enviada com sucesso!');
        // Limpa os campos após o envio bem-sucedido
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFeedbackMessage(`Erro ao enviar: ${data.message || 'Ocorreu um erro.'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setFeedbackMessage('Ocorreu um erro ao enviar a mensagem. Verifique sua conexão.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento, mesmo se houver erro
    }
  };

  return (
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

      {/* 3. Adicione o onSubmit ao formulário e o valor/onChange aos inputs */}
      <form className="contato__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={name} // Controla o valor do input com o estado
          onChange={(e) => setName(e.target.value)} // Atualiza o estado quando o input muda
          required
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}> {/* Desabilita o botão enquanto envia */}
          {loading ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>

      {/* 4. Exibir feedback ao usuário */}
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
    </div>
  );
};

export default Contato;