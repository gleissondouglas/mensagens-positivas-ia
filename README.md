# Mensagens Positivas com IA 🤍

Aplicação full-stack simples que gera **mensagens positivas personalizadas** usando Inteligência Artificial.  
O usuário informa seu nome e três palavras, e a IA devolve uma mensagem curta em estilo de conversa.

---

## ✨ Demonstração

- Frontend em HTML, CSS e JavaScript puro  
- Backend em Node.js + Express  
- Integração com a API do **Google Gemini**

A interface simula um **chat com balões de conversa**, focando em simplicidade e boa experiência do usuário.

---

## 🧠 Como funciona

1. O usuário informa:
   - Nome
   - 3 palavras
2. O frontend envia os dados para o backend (`POST /generate`)
3. O backend valida os dados
4. Um prompt é montado e enviado para a IA
5. A IA gera a mensagem positiva
6. O backend devolve a resposta
7. O frontend exibe a mensagem em formato de chat

---

## 🛠️ Tecnologias utilizadas

### Backend
- Node.js
- Express
- API Google Gemini
- dotenv

### Frontend
- HTML5
- CSS3 (gradientes e layout moderno)
- JavaScript (fetch API)

---

## 📁 Estrutura do projeto

# Mensagens Positivas com IA 🤍

Aplicação full-stack simples que gera **mensagens positivas personalizadas** usando Inteligência Artificial.  
O usuário informa seu nome e três palavras, e a IA devolve uma mensagem curta em estilo de conversa.

---

## ✨ Demonstração

- Frontend em HTML, CSS e JavaScript puro  
- Backend em Node.js + Express  
- Integração com a API do **Google Gemini**

A interface simula um **chat com balões de conversa**, focando em simplicidade e boa experiência do usuário.

---

## 🧠 Como funciona

1. O usuário informa:
   - Nome
   - 3 palavras
2. O frontend envia os dados para o backend (`POST /generate`)
3. O backend valida os dados
4. Um prompt é montado e enviado para a IA
5. A IA gera a mensagem positiva
6. O backend devolve a resposta
7. O frontend exibe a mensagem em formato de chat

---

## 🛠️ Tecnologias utilizadas

### Backend
- Node.js
- Express
- API Google Gemini
- dotenv

### Frontend
- HTML5
- CSS3 (gradientes e layout moderno)
- JavaScript (fetch API)

---

## 📁 Estrutura do projeto

mensagens-positivas-ia/
│
├── frontend/
│ └── index.html
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── .gitignore


---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js (v18 ou superior)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/gleissondouglas/mensagens-positivas-ia.git
cd mensagens-positivas-ia

Instale as dependências:
npm install

Crie um arquivo .env baseado no .env.example:
GEMINI_API_KEY=SUA_CHAVE_DA_API
PORT=3000

npm run dev

Acesse no navegador:
http://localhost:3000

Objetivo
Projeto criado para praticar integração entre frontend e backend, consumo de API de IA e organização de um projeto full-stack simples e funcional.

Autor: Douglas Oliveira

Estudante de Análise e Desenvolvimento de Sistemas





