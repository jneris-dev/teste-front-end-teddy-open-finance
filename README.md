# 💻 Projeto Front-End Teddy Open Finance

Este projeto é uma aplicação web desenvolvida como um teste técnico para front-end. O objetivo é simular um sistema de gerenciamento de clientes, permitindo o cadastro, visualização, edição, seleção e exclusão de dados de clientes de forma segura e eficiente.

### 🚀 Visite a Aplicação

---

Acesse a versão em produção da aplicação clicando no link abaixo:

[**🔗 Visitar Aplicação em Produção**](https://teste-front-end-teddy-open-finance.vercel.app)

### ⚙️ Funcionalidades

---

- **Autenticação:** Sistema de login simulado para acesso ao painel de controle.
- **CRUD de Clientes:**
  - **C**riar: Formulário para cadastro de novos clientes.
  - **R**ecuperar: Listagem completa e detalhada de todos os clientes.
  - **U**pdate: Funcionalidade para editar informações de clientes existentes.
  - **D**elete: Opção para remover um cliente do sistema.
- **Responsividade:** Layout adaptável para diferentes tamanhos de tela (desktop e mobile).
- **Gerenciamento de Estado:** Utiliza `localStorage` para persistência de dados de autenticação e clientes.

### 🧪 Tecnologias Utilizadas

---

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Adiciona tipagem estática ao JavaScript, melhorando a escalabilidade e a manutenção.
- **Vite:** Ferramenta de build moderna e rápida para projetos front-end.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Vitest:** Framework de testes unitários e de integração.
- **TailwindCSS:** Framework CSS para estilização da aplicação.
- **Phosphor Icons:** Biblioteca de icones.
- **Crypto-JS:** Biblioteca para criptografia e segurança de dados.
- **react-router-dom:** Gerenciamento de rotas.
- **Docker:** Para containerização e execução da aplicação em um ambiente isolado.

### 🔧 Instalação e Execução

---

Para rodar o projeto localmente, siga os passos abaixo:

**Pré-requisitos:**

- [Node.js](https://nodejs.org/) (v22.15.0 LTS)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) (para rodar em contêiner)

#### 1\. Via linha de comando (sem Docker)

```bash
# Clone o repositório
git clone https://github.com/jneris-dev/teste-front-end-teddy-open-finance.git

# Acesse o diretório do projeto
cd teste-front-end-teddy-open-finance

# Instale as dependências
npm install

# Inicie a aplicação em modo de desenvolvimento
npm run dev
```

A aplicação estará acessível em `http://localhost:5173`.

#### 2\. Com Docker

Se você tem o Docker instalado, pode construir e rodar a aplicação em um contêiner.

```bash
# Construa a imagem Docker
docker build -t meu-app-react:1.0 .

# Execute o contêiner, mapeando a porta 8080 da sua máquina para a porta 80 do contêiner
docker run -p 8080:80 meu-app-react:1.0
```

A aplicação estará acessível em `http://localhost:8080`.

### ✔️ Testes

---

Para executar os testes unitários e de integração do projeto, use o seguinte comando:

```bash
# Executa todos os testes
npm run test
```

Ou, para rodar os testes em modo "watch" durante o desenvolvimento:

```bash
# Executa os testes em modo de observação
npm run test:watch
```

### 🔑 Variáveis de Ambiente

---

A aplicação utiliza variáveis de ambiente para a conexão com a API e para a criptografia.

- Na raiz do projeto, crie uma cópia do arquivo `.env.example` e renomeie-a para `.env.local`.
- As variáveis já estão preenchidas com os valores necessários para a avaliação do projeto. Não é necessário fazer nenhuma alteração, a menos que você queira apontar para outro endpoint.

### 📁 Estrutura do Projeto

---

A estrutura de diretórios do projeto segue a convenção padrão para aplicações React:

```
.
├── public/                 # Arquivos públicos e estáticos
├── src/                    # Código fonte da aplicação
│   ├── assets/             # Imagens e outros ativos
│   ├── components/         # Componentes React reutilizáveis
│   ├── context/            # Contextos da aplicação
│   ├── guards/             # Funções para gerenciamento das rotas
│   ├── interfaces/         # Interfaces e tipagens (TypeScript)
│   ├── pages/              # Componentes de página
│   ├── router/             # Gerenciamento das rotas
│   ├── services/           # Serviços de comunicação com a API
│   ├── styles/             # Arquivos CSS e de estilização
│   ├── tests/              # Arquivos de testes
│   ├── util/               # Funções utilitárias
│   ├── App.tsx             # Componente raiz da aplicação
│   └── main.tsx            # Ponto de entrada da aplicação
├── .dockerignore           # Arquivos a serem ignorados pelo Docker
├── Dockerfile              # Instruções de build do Docker
├── .gitignore
├── package.json
└── README.md
```

### 📦 Construção do Projeto

---

Para gerar uma versão de produção da aplicação (otimizada para velocidade e tamanho), use o seguinte comando:

```bash
# Executa o build de produção
npm run build
```

Este comando irá criar uma pasta chamada dist/ na raiz do seu projeto. O conteúdo dessa pasta (index.html, arquivos CSS, JavaScript e outros assets) é a versão final e otimizada da sua aplicação, pronta para ser servida por um servidor web (como Nginx, Apache ou para ser implantada em serviços como Vercel, Netlify, etc.).
