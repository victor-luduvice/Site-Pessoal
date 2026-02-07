# 📁 Estrutura do Projeto - Guia Completo

## 📋 Índice Rápido

- [Estrutura Geral](#estrutura-geral)
- [Frontend (React + Vite)](#frontend-react--vite)
- [Backend (Node.js + Express)](#backend-nodejs--express)
- [Fluxo de Dados](#fluxo-de-dados)
- [Descrição dos Arquivos Importantes](#descrição-dos-arquivos-importantes)

---

## 🏗️ Estrutura Geral

```
site-pessoal/
│
├── 📂 backend/                    # API REST do servidor
│   ├── server.js                  # Arquivo principal do Express
│   ├── package.json               # Dependências do backend
│   ├── .env                       # Variáveis de ambiente (criar)
│   ├── .env.example               # Exemplo de variáveis
│   │
│   ├── 📂 config/
│   │   └── mongodb.js             # Conexão com MongoDB
│   │
│   └── 📂 models/
│       └── Message.js             # Schema/Modelo de mensagens
│
├── 📂 src/                        # Código-fonte React
│   ├── App.jsx                    # Componente raiz
│   ├── main.jsx                   # Entry point do React
│   ├── index.css                  # Estilos globais
│   ├── App.css                    # Estilos do App
│   │
│   ├── 📂 components/             # Componentes React
│   │   ├── Home/
│   │   │   ├── Home.jsx           # Seção inicial
│   │   │   └── Home.scss          # Estilos Home
│   │   ├── Sobre/
│   │   │   ├── Sobre.jsx          # Seção "Sobre mim"
│   │   │   └── Sobre.scss         # Estilos Sobre
│   │   ├── Projetos/
│   │   │   ├── Projetos.jsx       # Lista de projetos
│   │   │   └── Projetos.scss      # Estilos Projetos
│   │   ├── Servicos/
│   │   │   ├── Servicos.jsx       # Serviços oferecidos
│   │   │   └── Servicos.scss      # Estilos Serviços
│   │   └── Contato/
│   │       ├── Contato.jsx        # Formulário de contato ⭐
│   │       └── Contato.scss       # Estilos Contato
│   │
│   ├── 📂 styles/
│   │   └── App.css                # Estilos globais
│   │
│   └── 📂 assets/
│       ├── 📂 images/             # Imagens do projeto
│       └── 📂 icons/              # Ícones
│
├── 📂 public/                     # Arquivos estáticos
│
├── 📄 index.html                  # HTML principal
├── 📄 vite.config.js              # Configuração Vite
├── 📄 eslint.config.js            # Configuração ESLint
├── 📄 package.json                # Dependências frontend
├── 📄 SETUP_MONGODB.md            # Guia de setup MongoDB ⭐
├── 📄 README.md                   # Documentação do projeto
└── 📄 .gitignore                  # Arquivos ignorados pelo git

```

---

## 🎨 Frontend (React + Vite)

### O que é?
- **React**: Biblioteca JavaScript para criar interfaces interativas
- **Vite**: Build tool rápido e moderno
- **SCSS**: CSS com superpoderes (variáveis, nesting)

### Estrutura de Componentes

```
src/components/
├── Home/          → Seção de boas-vindas
├── Sobre/         → Informações pessoais
├── Projetos/      → Portfólio de projetos
├── Servicos/      → Serviços oferecidos
└── Contato/       → Formulário + Redes sociais ⭐
```

### Arquivo Principal: App.jsx
- Define a navbar (menu de navegação)
- Importa todos os componentes
- Define o layout geral

### Componente Importante: Contato.jsx
```
Contato.jsx
├── Estado: name, email, message
├── Função: handleSubmit()
├── Formulário: 3 inputs (nome, email, mensagem)
├── Redes Sociais: GitHub, LinkedIn, Instagram, WhatsApp
└── Feedback: Mensagens de sucesso/erro
```

---

## 🔌 Backend (Node.js + Express)

### O que é?
- **Express**: Framework web minimalista
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM (Object Document Mapper)
- **Nodemailer**: Envio de emails

### Arquivos Principais

#### server.js
- Configura o servidor Express
- Define as rotas da API
- Conecta ao MongoDB
- Processa requisições

#### config/mongodb.js
- Gerencia conexão com MongoDB
- Tratamento de erros
- Reconexão automática

#### models/Message.js
- Define o schema (estrutura) de mensagens
- Validações de campos
- Tipo de dados esperados

### Rotas da API

```
GET /
└─ Status: Verificar se servidor está online

POST /enviar-mensagem
├─ Input: { name, email, message }
├─ Valida dados
├─ Salva no MongoDB
├─ Envia email (opcional)
└─ Output: { message, messageId }
```

---

## 🔄 Fluxo de Dados

### 1. Usuário Preenche Formulário (Frontend)

```
Contato.jsx
─────────────────────────────
Estado antes:
  name: ''
  email: ''
  message: ''

Usuário digita:
  name: 'João Silva'
  email: 'joao@example.com'
  message: 'Olá, gostaria de...'
```

### 2. Usuário Clica em "Enviar Mensagem"

```
handleSubmit() é chamado
     ↓
Valida campos (nome, email, mensagem)
     ↓
Se válido, faz requisição POST
```

### 3. Requisição Para o Backend

```
POST http://localhost:3000/enviar-mensagem
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Olá, gostaria de..."
}
```

### 4. Backend Processa

```
server.js recebe requisição
     ↓
Valida dados novamente
     ↓
Cria objeto Message
     ↓
Salva no MongoDB
     ↓
Envia email (Nodemailer)
     ↓
Retorna resposta
```

### 5. Resposta Para Frontend

```
{
  "message": "Mensagem enviada e salva com sucesso!",
  "messageId": "6536f8a1b9c2d3e4f5g6h7i8"
}
```

### 6. Frontend Mostra Feedback

```
Contato.jsx
─────────────────────────────
feedbackMessage: "Mensagem enviada com sucesso!"
     ↓
Limpa o formulário
     ↓
Mostra mensagem por alguns segundos
```

### 7. Dados no MongoDB

```
Coleção: messages
{
  _id: ObjectId(...),
  name: "João Silva",
  email: "joao@example.com",
  message: "Olá, gostaria de...",
  createdAt: 2024-01-15T10:30:00Z,
  updatedAt: 2024-01-15T10:30:00Z
}
```

---

## 📝 Descrição dos Arquivos Importantes

### Frontend

| Arquivo | Responsabilidade |
|---------|------------------|
| `App.jsx` | Componente principal, navbar, layout geral |
| `main.jsx` | Entry point do React, renderiza App |
| `src/components/Contato/Contato.jsx` | Formulário de contato, faz requisição ao backend |
| `vite.config.js` | Configuração do build e dev server |

### Backend

| Arquivo | Responsabilidade |
|---------|------------------|
| `server.js` | Servidor Express, rotas, lógica principal |
| `config/mongodb.js` | Conexão e autenticação com MongoDB |
| `models/Message.js` | Schema/Validação de dados de mensagens |
| `package.json` | Lista de dependências do backend |

### Configuração

| Arquivo | Responsabilidade |
|---------|------------------|
| `.env` | Variáveis de ambiente (criar) |
| `.env.example` | Exemplo de variáveis (template) |
| `SETUP_MONGODB.md` | Guia de configuração do banco |
| `.gitignore` | Arquivos não versionados (node_modules, .env) |

---

## 🚀 Como Usar

### Iniciar Desenvolvimento

1. **Backend**:
```bash
cd backend
npm install      # Primeira vez
npm run dev      # Rodar servidor
```

2. **Frontend**:
```bash
npm install      # Primeira vez (raiz do projeto)
npm run dev      # Rodar Vite dev server
```

3. **Acessar**:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Build para Produção

```bash
# Frontend
npm run build

# Backend (já está pronto, não precisa build)
```

---

## 🔍 Quando Olhar Para Onde

| Problema | Arquivo |
|----------|---------|
| Página não aparece | `src/App.jsx` |
| Navbar incorreta | `src/App.jsx` ou estilos |
| Formulário não funciona | `src/components/Contato/Contato.jsx` |
| Erro ao enviar formulário | `backend/server.js` |
| Dados não salvam no BD | `backend/config/mongodb.js` ou `models/Message.js` |
| Email não envia | `backend/server.js` (config Nodemailer) |
| Variáveis de ambiente | `.env` (criar) ou `.env.example` |
| Estilo incorreto | `src/styles/` ou `src/components/*/` |

---

## 📚 Próximas Etapas

- [ ] Configurar MongoDB (local ou Atlas)
- [ ] Criar arquivo `.env`
- [ ] Testar formulário de contato
- [ ] Adicionar validação de email
- [ ] Implementar logout automático
- [ ] Adicionar imagens/icons aos projetos
- [ ] Criar dashboard para ver mensagens recebidas
- [ ] Deploy no Vercel/Heroku

---

## 💡 Dicas

1. **Sempre consulte os comentários** no código - Cada arquivo tem explicações!
2. **Use F12 no navegador** para ver erros do frontend (Console tab)
3. **Use `npm run dev`** e veja a saída do console do terminal
4. **MongoDB Compass** é essencial para verificar dados salvos
5. **Postman** é útil para testar rotas do backend

---

## ❓ Dúvidas?

Cada arquivo tem comentários detalhados explicando:
- O que cada funcionalidade faz
- Qual é a responsabilidade
- Como os dados fluem
- Que variáveis são necessárias

Comece sempre lendo os comentários do arquivo! 📝
