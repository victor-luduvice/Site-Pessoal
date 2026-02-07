# 🗄️ SETUP - MongoDB e Variáveis de Ambiente

## 📋 Índice
1. [Instalação do MongoDB](#instalação-do-mongodb)
2. [Configuração do Backend](#configuração-do-backend)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Testes](#testes)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Instalação do MongoDB

Escolha uma opção:

### Opção 1: MongoDB Local (Recomendado para Desenvolvimento)

#### Windows:
1. Baixe o instalador em: https://www.mongodb.com/try/download/community
2. Execute o instalador e siga os passos
3. Faça download também do MongoDB Compass (GUI visual)
4. Abra o CMD e verifique:
   ```bash
   mongod --version
   ```

#### Linux:
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

---

### Opção 2: MongoDB Atlas (Nuvem - Recomendado para Produção)

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um novo cluster
4. Configure as credenciais de conexão
5. Copie a URI de conexão (será como: `mongodb+srv://username:password@cluster.mongodb.net/database`)

---

## ⚙️ Configuração do Backend

### 1️⃣ Crie o arquivo `.env`

Na pasta `backend/`, crie um arquivo chamado `.env` (baseado no `.env.example`):

```bash
# Copiar do .env.example
cp .env.example .env
```

### 2️⃣ Preencha as variáveis

Edite o arquivo `.env` com seus dados:

```env
# SERVIDOR
PORT=3000

# MONGODB (escolha uma)
# Para local:
MONGODB_URI=mongodb://localhost:27017/site-pessoal

# Ou para MongoDB Atlas (nuvem):
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@seu-cluster.mongodb.net/site-pessoal?retryWrites=true&w=majority

# EMAIL (Outlook)
EMAIL_USER=seu-email@outlook.com
EMAIL_PASS=sua-senha-de-app
RECEIVING_EMAIL=seu-email@outlook.com
```

---

## 🔐 Variáveis de Ambiente

### MONGODB_URI
- **Local**: `mongodb://localhost:27017/site-pessoal`
- **Atlas**: `mongodb+srv://user:pass@cluster.mongodb.net/site-pessoal`

### EMAIL Config (Outlook)

#### Se usar Autenticação Normal:
- `EMAIL_USER`: Seu email Outlook (ex: seu-email@outlook.com)
- `EMAIL_PASS`: Sua senha do Outlook

#### Se usar 2FA (Recomendado):
1. Acesse: https://account.live.com/
2. Vá para "Segurança"
3. Crie uma "Senha de app"
4. Use essa senha no `.env`

---

## 🧪 Testes

### 1. Testar Conexão com MongoDB

```bash
cd backend
npm run dev
```

Se conectou com sucesso, verá:
```
✅ Conectado ao MongoDB com sucesso!
📌 Banco de dados: mongodb://localhost:27017/site-pessoal
```

### 2. Testar a Rota de Contato

Use Postman ou cURL:

```bash
curl -X POST http://localhost:3000/enviar-mensagem \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Olá, tudo bem?"
  }'
```

Resposta esperada:
```json
{
  "message": "Mensagem enviada e salva com sucesso!",
  "messageId": "6536f8a1b9c2d3e4f5g6h7i8"
}
```

### 3. Verificar Dados no MongoDB

#### Via MongoDB Compass:
1. Abra o MongoDB Compass
2. Conecte-se ao seu banco
3. Vá para: `site-pessoal` → `messages`
4. Veja as mensagens inseridas

#### Via MongoDB Atlas (Web):
1. Acesse seu cluster
2. Clique em "Collections"
3. Veja a coleção `messages`

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'mongoose'"
```bash
cd backend
npm install mongoose
```

### Erro: "Connection refused"
- Verifique se o MongoDB está rodando
- **Windows**: Abra Services e procure "MongoDB"
- **Linux/Mac**: `brew services start mongodb-community`

### Erro: "URI invalid"
- Verifique se a MONGODB_URI no `.env` está correta
- Não use espaços na URI
- Se usar MongoDB Atlas, garanta que seu cluster permite acesso do seu IP

### Erro: "Email não envia"
- Verifique se EMAIL_USER e EMAIL_PASS estão corretos
- Se usa 2FA, você PRECISA gerar uma "Senha de app"
- Verifique se a porta 587 não está bloqueada

### Mensagem em português não aparece (Encoding)
- Verifique que o arquivo está salvo como UTF-8
- No VS Code: Canto inferior direito → "UTF-8"

---

## 📚 Estrutura do MongoDB

```
database: site-pessoal
  └── collection: messages
       ├── _id: ObjectId (automático)
       ├── name: String
       ├── email: String
       ├── message: String
       ├── createdAt: Date (automático)
       └── updatedAt: Date (automático)
```

---

## 🔄 Fluxo Completo

```
Frontend (React)
    ↓
Formulário Contato.jsx
    ↓
POST /enviar-mensagem
    ↓
Backend (Express)
    ↓
Valida dados
    ↓
Salva no MongoDB ✅
    ↓
Envia email (opcional)
    ↓
Retorna sucesso
    ↓
Frontend mostra feedback ✅
```

---

## ✅ Pronto!

Agora você tem:
- ✅ MongoDB configurado
- ✅ Backend salva mensagens
- ✅ Emails de notificação (opcional)
- ✅ Frontend com formulário funcional

Qualquer dúvida, consulte os comentários no código! 📝
