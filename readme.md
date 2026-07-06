# Backend - Dependências

Este documento descreve as dependências utilizadas no backend do projeto e suas respectivas funções.

## Tecnologias

- **Node.js** - Ambiente de execução JavaScript.
- **TypeScript** - Linguagem utilizada no desenvolvimento do backend.
- **Express** - Framework para criação da API REST.
- **PostgreSQL** - Banco de dados relacional.
- **Prisma ORM** - Mapeamento objeto-relacional (ORM) e gerenciamento das migrations.
- **Docker** - Containerização da aplicação.

---

# Dependências

## @prisma/client

Cliente do Prisma utilizado para realizar consultas e operações no banco de dados através do ORM.

```bash
npm install @prisma/client
```

---

## prisma

Ferramenta responsável pelo gerenciamento do banco de dados, criação de migrations, geração do cliente Prisma e sincronização do schema.

```bash
npm install prisma
```

---

## express

Framework responsável pela criação da API REST, definição de rotas, middlewares e gerenciamento das requisições HTTP.

```bash
npm install express
```

---

## pg

Driver de conexão entre a aplicação Node.js e o banco de dados PostgreSQL.

```bash
npm install pg
```

---

## cors

Middleware utilizado para permitir requisições entre diferentes origens (Cross-Origin Resource Sharing), possibilitando a comunicação entre frontend e backend.

```bash
npm install cors
```

---

## dotenv

Responsável por carregar as variáveis de ambiente definidas no arquivo `.env`, como credenciais do banco de dados, portas e chaves secretas.

```bash
npm install dotenv
```

---

## bcrypt

Biblioteca utilizada para criptografar senhas antes de armazená-las no banco de dados, aumentando a segurança da aplicação.

```bash
npm install bcrypt
```

---

## jsonwebtoken

Implementa autenticação baseada em JSON Web Tokens (JWT), permitindo a geração e validação de tokens de acesso para usuários autenticados.

```bash
npm install jsonwebtoken
```

---

## multer

Middleware utilizado para realizar upload de arquivos enviados pelos usuários, como imagens e documentos.

```bash
npm install multer
```

---

# Dependências de Desenvolvimento

As dependências abaixo são utilizadas apenas durante o desenvolvimento da aplicação.

## typescript

Compilador responsável por converter o código TypeScript em JavaScript.

```bash
npm install -D typescript
```

---

## ts-node

Permite executar arquivos TypeScript diretamente, sem necessidade de compilação prévia.

```bash
npm install -D ts-node
```

---

## nodemon

Monitora alterações nos arquivos do projeto e reinicia automaticamente o servidor durante o desenvolvimento.

```bash
npm install -D nodemon
```

---

## @types/*

Pacotes de tipagem utilizados pelo TypeScript para fornecer suporte às bibliotecas JavaScript utilizadas no projeto.

Incluem:

- `@types/node`
- `@types/express`
- `@types/cors`
- `@types/bcrypt`
- `@types/jsonwebtoken`
- `@types/multer`

---

# Dependências de Infraestrutura

Além das bibliotecas instaladas via npm, o backend depende dos seguintes softwares:

- Node.js (versão 18 ou superior)
- PostgreSQL
- Docker
- Docker Compose (para execução em containers)

---

# Instalação

Instale todas as dependências do projeto com:

```bash
npm install
```

---

# Scripts disponíveis

| Script | Descrição |
|---------|-----------|
| `npm run dev` | Executa o backend em modo de desenvolvimento utilizando TypeScript. |
| `npm run build` | Compila o projeto para JavaScript. |
| `npm start` | Executa a versão compilada da aplicação. |
| `npm run db:migrate` | Executa as migrations do banco de dados. |
| `npm run db:seed` | Popula o banco de dados com dados iniciais. |
| `npm run docker:start` | Executa as migrations, popula o banco e inicia a aplicação. |

# Frontend - Dependências

Este documento descreve as dependências utilizadas no frontend do projeto e suas respectivas funções.

## Tecnologias

- **React** - Biblioteca para construção da interface de usuário.
- **TypeScript** - Linguagem utilizada no desenvolvimento do frontend.
- **Vite** - Ferramenta de desenvolvimento e build da aplicação.
- **React Router** - Gerenciamento de rotas da aplicação.
- **Axios** - Cliente HTTP para comunicação com a API do backend.

---

# Dependências

## react

Biblioteca principal utilizada para desenvolver interfaces de usuário baseadas em componentes reutilizáveis.

```bash
npm install react
```

---

## react-dom

Responsável por renderizar os componentes React no navegador e conectar a aplicação à árvore DOM da página.

```bash
npm install react-dom
```

---

## react-router-dom

Biblioteca utilizada para implementar o roteamento da aplicação, permitindo a navegação entre páginas sem recarregar o navegador.

```bash
npm install react-router-dom
```

---

## axios

Cliente HTTP utilizado para realizar requisições à API do backend, como consultas, autenticação, envio e recebimento de dados.

```bash
npm install axios
```

---

# Dependências de Desenvolvimento

As dependências abaixo são utilizadas apenas durante o desenvolvimento da aplicação.

## vite

Ferramenta responsável pelo ambiente de desenvolvimento e pela geração da versão de produção do frontend. Oferece inicialização rápida, Hot Module Replacement (HMR) e otimização do build.

```bash
npm install -D vite
```

---

## @vitejs/plugin-react

Plugin oficial do Vite que adiciona suporte ao React, incluindo Fast Refresh durante o desenvolvimento.

```bash
npm install -D @vitejs/plugin-react
```

---

## typescript

Compilador responsável por converter o código TypeScript em JavaScript e realizar a verificação de tipos.

```bash
npm install -D typescript
```

---

## eslint

Ferramenta de análise estática utilizada para identificar erros de sintaxe, problemas de estilo e boas práticas no código.

```bash
npm install -D eslint
```

---

## @eslint/js

Configuração base do ESLint para projetos JavaScript.

```bash
npm install -D @eslint/js
```

---

## typescript-eslint

Conjunto de ferramentas que integra o ESLint ao TypeScript, permitindo analisar código TypeScript e aplicar regras específicas da linguagem.

```bash
npm install -D typescript-eslint
```

---

## eslint-plugin-react-hooks

Plugin do ESLint responsável por validar o uso correto dos Hooks do React, prevenindo erros comuns relacionados ao ciclo de vida dos componentes.

```bash
npm install -D eslint-plugin-react-hooks
```

---

## eslint-plugin-react-refresh

Plugin que auxilia na compatibilidade entre o ESLint e o React Fast Refresh durante o desenvolvimento.

```bash
npm install -D eslint-plugin-react-refresh
```

---

## globals

Fornece definições das variáveis globais disponíveis em diferentes ambientes de execução, auxiliando na configuração do ESLint.

```bash
npm install -D globals
```

---

## @types/react

Fornece as definições de tipos do React para o TypeScript.

```bash
npm install -D @types/react
```

---

## @types/react-dom

Fornece as definições de tipos do React DOM para o TypeScript.

```bash
npm install -D @types/react-dom
```

---

## @types/node

Disponibiliza as definições de tipos da API do Node.js utilizadas durante o desenvolvimento e configuração do projeto.

```bash
npm install -D @types/node
```

---

# Dependências de Infraestrutura

Além das bibliotecas instaladas via npm, o frontend depende dos seguintes softwares:

- Node.js (versão 18 ou superior)
- npm
- Vite
- Docker (para execução em containers)
- Docker Compose (quando utilizado juntamente com o backend)

---

# Instalação

Instale todas as dependências do projeto com:

```bash
npm install
```

---

# Scripts disponíveis

| Script | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento utilizando o Vite. |
| `npm run build` | Compila o projeto TypeScript e gera a versão otimizada para produção. |
| `npm run preview` | Executa uma pré-visualização local da versão de produção gerada pelo Vite. |
| `npm run lint` | Analisa o código utilizando o ESLint para identificar erros e inconsistências. |