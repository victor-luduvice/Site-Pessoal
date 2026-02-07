# 📚 Guia Rápido de Referência

## 🎯 Como Usar Este Projeto

### 1️⃣ Primeira Execução

```bash
# Terminal 1 - Frontend
npm install
npm run dev
# Acesse: http://localhost:5173

# Terminal 2 - Backend
cd backend
npm install
npm run dev
# Servidor em: http://localhost:3000
```

### 2️⃣ Configuração Necessária

Crie `.env` na pasta backend (baseado em `.env.example`):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/site-pessoal
EMAIL_USER=seu-email@outlook.com
EMAIL_PASS=sua-senha
RECEIVING_EMAIL=seu-email@outlook.com
```

### 3️⃣ Testar Tudo

✅ Acesse http://localhost:5173  
✅ Teste o formulário de contato  
✅ Verifique se a mensagem aparece no MongoDB  

---

## 📍 Mapa de Arquivos

```
Quando você precisar editar...          Vá para este arquivo
─────────────────────────────────────────────────────────────
Navbar/Menu/Redes Sociais         →   src/App.jsx
Formulário de Contato             →   src/components/Contato/Contato.jsx
Seção Home/Inicial                →   src/components/Home/Home.jsx
Seção Sobre                       →   src/components/Sobre/Sobre.jsx
Seção Projetos                    →   src/components/Projetos/Projetos.jsx
Seção Serviços                    →   src/components/Servicos/Servicos.jsx
Estilos Globais                   →   src/styles/App.css
Rotas do Backend                  →   backend/server.js
Conexão MongoDB                   →   backend/config/mongodb.js
Modelo de Dados (Messaging)       →   backend/models/Message.js
Variáveis de Ambiente             →   backend/.env (criar)
```

---

## 🔍 Diagnosticar Problemas

| Problema | Causa Provável | Solução |
|----------||----|
| Página em branco | Erro no React | F12 → Console (procure erros) |
| Botões não funcionam | scrollToSection não encontra ID | Verifique `id="secao"` nas seções |
| Formulário não envia | Backend offline | Rode `npm run dev` na pasta backend |
| Erro "Cannot POST" | Rota não existe | Cheque `POST /enviar-mensagem` em server.js |
| MongoDB connection error | MongoDB não rodando | Windows: Services → MongoDB start |
| Dados não salvam | Schema inválido | Verifique `models/Message.js` |
| Email não envia | .env incorreto | Copie `.env.example` e preencha dados |

---

## 📊 Fluxo da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  http://localhost:5173                                      │
├─────────────────────────────────────────────────────────────┤
│  App.jsx (Navbar + Componentes principais)                  │
│  ├─ Home.jsx ────────────────────┐                          │
│  ├─ Sobre.jsx ───────────────────├─ Renderizado            │
│  ├─ Projetos.jsx ────────────────├─ Dinamicamente           │
│  ├─ Servicos.jsx ────────────────┤  com React              │
│  └─ Contato.jsx ⭐ ──────────────┤  (SPA)                  │
│      └─ Formulário ────────────────┘                        │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ POST /enviar-mensagem
                             │ {name, email, message}
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express)                         │
│  http://localhost:3000                                      │
├─────────────────────────────────────────────────────────────┤
│  server.js (Recebe requisição)                              │
│  └─ Valida dados                                            │
│     └─ Cria Message object                                  │
│        └─ Salva no MongoDB ✅                               │
│        └─ Envia email (opcional)                            │
│           └─ Retorna resposta                               │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Response
                             │ {message, messageId}
                             ↓
                     Formulário Limpo ✅
                  Feedback ao Usuário ✅
                   Mensagem no BD ✅
```

---

## 💬 Comentários no Código

Cada arquivo tem comentários explicando:

```javascript
/**
 * ====================================
 * COMPONENTE/ARQUIVO: Nome
 * ====================================
 * Breve descrição do que faz
 * 
 * RESPONSABILIDADES:
 * - O que este arquivo faz
 * - Por que existe
 * - Como se conecta com outros
 * 
 * DEPENDÊNCIAS:
 * - Bibliotecas que usa
 */
```

**Sempre leia os comentários antes de editar!** 📝

---

## 🚀 Próximos Passos

- [ ] **Validação avançada de email** - Usar regex ou biblioteca
- [ ] **CAPTCHA** - Evitar spam (Google reCAPTCHA)
- [ ] **Dashboard** - Visualizar mensagens recebidas
- [ ] **Rate limiting** - Limitar requisições por IP
- [ ] **Email confirmação** - Enviar confirmar recebimento
- [ ] **Testes automatizados** - Jest/Mocha
- [ ] **Deploy** - Heroku/Vercel/AWS
- [ ] **SSL/HTTPS** - Segurança na produção

---

## 🔗 Links Importantes

- **MongoDB Local**: Instalar em https://www.mongodb.com/try/download/community
- **MongoDB Compass**: GUI para MongoDB https://www.mongodb.com/products/compass
- **MongoDB Atlas**: MongoDB na nuvem https://www.mongodb.com/cloud/atlas
- **Postman**: Testar APIs https://www.postman.com/
- **VS Code**: Editor https://code.visualstudio.com/

---

## 📞 Checklist Final

Antes de fazer deploy:

- [ ] `.env` criado com variáveis corretas
- [ ] MongoDB configurado e rodando
- [ ] Backend testado (GET / retorna mensagem)
- [ ] Formulário testado (POST /enviar-mensagem)
- [ ] Mensagem salva no MongoDB
- [ ] Email funciona (se configurado)
- [ ] Frontend e Backend conectados
- [ ] Banco de dados seguro (credenciais em .env)
- [ ] Nenhum `.env` no GitHub (.gitignore)
- [ ] Código limpo e comentado

---

## 🎓 Recursos de Aprendizado

- **React**: https://react.dev
- **Express**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Mongoose**: https://mongoosejs.com/
- **Vite**: https://vitejs.dev/

---

## 📝 Resumo Visual

```
┌─────────────────────────────────────────┐
│         SEU SITE PESSOAL                │
├─────────────────────────────────────────┤
│                                         │
│  [NAVBAR] GitHub LinkedIn Instagram    │
│                                         │
│  [HOME]      Bem-vindo                  │
│  [SOBRE]     Quem sou                   │
│  [PROJETOS]  Portfólio                  │
│  [SERVIÇOS]  O que faço                 │
│  [CONTATO]   Formulário + WhatsApp ⭐  │
│              ├─ Nome                    │
│              ├─ Email                   │
│              ├─ Mensagem                │
│              └─ [Enviar] → MongoDB ✅  │
│                                         │
└─────────────────────────────────────────┘
```

---

## ❓ FAQ

**P: Posso rodar tudo em uma aba?**  
R: Sim! Use bash ou PowerShell com `&&` ou `;` para rodar dois comandos

**P: Como adicionar mais seções?**  
R: Crie novo componente em `src/components/`, importe em `App.jsx` e adicione `<section>` com ID único

**P: Como mudar cores/design?**  
R: Edite `src/styles/App.css` ou SCSS dos componentes

**P: Como adicionar validação de email?**  
R: No backend (`server.js`), adicione regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**P: Como proteger o backend de spam?**  
R: Use bibliotecas como `express-rate-limit`

---

Boa sorte com seu projeto! 🚀
