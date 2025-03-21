# API CRUD em Node.js com Banco de Dados Azure

Este projeto é uma aplicação Node.js que implementa operações CRUD (Criar, Ler, Atualizar e Deletar) utilizando um banco de dados hospedado na Azure. A API gerencia informações sobre médicos e pacientes.

---

## Requisitos
- Node.js instalado
- Conta e banco de dados configurado na Azure

---

## Como Rodar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configuração do Banco de Dados

Crie um arquivo `.env` na raiz do projeto e preencha as variáveis:
```env
AZURE_DB_HOST=seu-host-da-azure
AZURE_DB_USER=seu-usuario
AZURE_DB_PASSWORD=sua-senha
AZURE_DB_DATABASE=seu-banco-de-dados
AZURE_DB_PORT=porta-do-banco (geralmente 1433)
PORT=3000
```

### 4. Executar a Aplicação
```bash
node server.js
```

A aplicação rodará na porta definida (padrão: `3000`).

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Endpoints da API

### Médicos

- **Criar Médico**
  - Método: `POST`
  - Endpoint: `/api/medicos`
  - Body (JSON):
```json
{
  "nome": "Dr. João Silva",
  "email": "joao.silva@exemplo.com",
  "crm": "123456",
  "telefone": "(11) 98765-4321"
}
```

- **Listar Médicos**
  - Método: `GET`
  - Endpoint: `/api/medicos`

- **Atualizar Médico**
  - Método: `PUT`
  - Endpoint: `/api/medicos/{id}`
  - Body (JSON):
```json
{
  "nome": "Dr. Caio Kenji",
  "email": "caio.kenji@exemplo.com",
  "crm": "101010",
  "telefone": "(11) 98765-4321"
}
```

- **Deletar Médico**
  - Método: `DELETE`
  - Endpoint: `/api/medicos/{id}`

---

### Pacientes

- **Criar Paciente**
  - Método: `POST`
  - Endpoint: `/api/pacientes`
  - Body (JSON):
```json
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}
```

- **Listar Pacientes**
  - Método: `GET`
  - Endpoint: `/api/pacientes`

- **Atualizar Paciente**
  - Método: `PUT`
  - Endpoint: `/api/pacientes/{id}`
  - Body (JSON):
```json
{
  "nome": "Maria Santa",
  "email": "maria.santa@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}
```

- **Deletar Paciente**
  - Método: `DELETE`
  - Endpoint: `/api/pacientes/{id}`

---

## Testando a API
Utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para realizar requisições e testar todas as operações CRUD.

---

## Contribuições
Sinta-se livre para contribuir com melhorias ou novas funcionalidades!


