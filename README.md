# Começando 

Qual o propósito dessa API? 

Essa API foi modelada e criada por mim com base nas entidades observadas do site [todoist.com](https://todoist.com/)

obs: a modelagem pode ser achada no arquivo `model.drawio` na raiz do projeto

Quais funcionalidade e conceitos você verá aqui?

- Autenticação usando Passport e JWT
- Uso mais apropriado do Prisma, tornando possível o uso do Prisma client extensions
- Design e estrutura de projeto mais elegante do que as encontradas na documentação do NestJS
- CI e CD pelo Github Actions com deploy no site de hospedagem de serviços Render
- Serviço de log personalizado usando o Pino
- Testes de Unidade seguindo as melhores práticas de testagem de software (com o uso do pattern Humble Object por exemplo) e testes E2E
- Clean Code e SOLID

## Tabela de conteúdos
1. [Inicializando localmente](#inicializando-localmente)
2. [Configurando o JWT](#configurando-o-jwt)
3. [Testando a API](#testando-a-api)
4. [Executando os testes automatizados](#executando-os-testes-automatizados)

### O que será necessário para iniciar o projeto?
- Docker compose
- pnpm
- NodeJS
- dotenv-cli
- prisma
- curl

## Inicializando localmente
**Atenção**: execute os comandos a seguir na raiz do projeto

#### 1. Instalando dependências 
primeiro clone esse projeto para um diretório local seu

```bash
  git clone git@github.com:oh-math/task-management.git 
```

instale as dependências
```bash
    pnpm install

    # copia o aquivo `.env.example` para um novo arquivo chamado`.env.dev` 
    cp .env.example .env.dev
```

- Mude as letras em maiúsculo especialmente as que estão abaixo do comentário `# PostgreSQL database configs`

#### 2. Criando um Container Docker

```bash
# a flag '-d' executa o container em background sem travar o terminal
docker-compose up -d
```

ou

```bash
docker compose up -d
```

#### 3. Aplicando migrações do prisma

    pnpm push



## Configurando o JWT

#### 1. Criando um hash base64

    openssl rand -base64  32

#### 2. Use o hash gerado

-  Insira o hash criado na sua variável de ambiente **JWT_SECRET_KEY** localizada no arquivo `.env.dev` antes criado 

#### 3. Inicie a aplicação 

    pnpm start:dev

## Testando a API

#### 1. Criando um usuário 
**Note:** Os nomes aqui presente foram gerados automaticamente pela **4devs**

```bash
curl -X POST http://localhost:3000/api/user -H 'Content-Type: application/json' -d '{"name": "Marcos Felipe Ian Lopes", "email": "marcos@email.com", "password": "1234"}'
```

#### 2. Fazendo login 

Faça login usando a senha e e-mail criados no ultimo passo 

```bash
curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "marcos@email.com", "password": "1234"}'
```

você recerá um token, copie ele

#### 3. Teste em uma rota protegida 

Insira o token gerado onde está as chaves (remova as chaves)

```bash
 curl -X GET http://localhost:3000/api/project -H 'Content-Type: application/json' -H "Authorization: Bearer {token}"
```

Se tudo estive certo você deve ver um único colchete: "[]"

## Executando os testes automatizados

#### 1. Crie um arquivo dotenv

```bash
    cp .env.example .env.test
```

faça as mesmas coisas instruídas na inicialização por substituir os valores em maiúsculo

#### Testes unitários
```bash
  pnpm test:cov
```
#### Testes de integração
```bash
  pnpm test:e2e
```