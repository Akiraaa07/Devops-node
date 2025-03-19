Projeto Node.js CRUD com Banco de Dados na Azure

Este repositório contém uma aplicação Node.js que realiza operações CRUD (Criar, Ler, Atualizar e Deletar) em um banco de dados hospedado na nuvem da Azure. O objetivo deste projeto é fornecer uma API para gerenciar informações de médicos e pacientes.

Após clonar este repositório, você poderá testar as operações utilizando ferramentas como Postman ou Insomnia.

Passos para Rodar a Aplicação
1. Clonar o Repositório
Primeiro, clone o repositório para o seu ambiente local utilizando o comando abaixo:
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git


2. Instalar dependências
Após clonar o repositório, entre na pasta do projeto e instale as dependências utilizando o npm:
cd NOME_DO_REPOSITORIO
npm install


3. Rodar a aplicação
Para rodar a aplicação, execute o seguinte comando:
node server.js

A aplicação estará rodando na porta configurada (por padrão, a porta é 3000). Você poderá acessar a API em http://localhost:3000.


5. Testando o CRUD com Postman ou Insomnia
Você pode usar o Postman ou Insomnia para testar as operações CRUD da API. Abaixo estão as rotas e exemplos de requisição.


Endpoints da API
Operações com Médicos:

1. Criar um Novo Médico (POST)
Endpoint: http://localhost:3000/api/medicos
Método: POST
Corpo (body) em formato JSON:
{
  "nome": "Dr. João Silva",
  "email": "joao.silva@exemplo.com",
  "crm": "123456",
  "telefone": "(11) 98765-4321"
}


2. Listar Todos os Médicos (GET)
Endpoint: http://localhost:3000/api/medicos
Método: GET
Descrição: Retorna uma lista de todos os médicos cadastrados.


3. Atualizar um Médico Existente (PUT)
Endpoint: http://localhost:3000/api/medicos/{id}
Método: PUT
Parâmetro: {id} (substitua com o ID do médico que deseja atualizar)
Corpo (body) em formato JSON:
{
  "nome": "Dr. Caio Kenji",
  "email": "caio.kenji@exemplo.com",
  "crm": "101010",
  "telefone": "(11) 98765-4321"
}


4. Deletar um Médico (DELETE)
Endpoint: http://localhost:3000/api/medicos/{id}
Método: DELETE
Parâmetro: {id} (substitua com o ID do médico que deseja deletar)

Operações com Pacientes:

1. Criar um Novo Paciente (POST)
Endpoint: http://localhost:3000/api/pacientes
Método: POST
Corpo (body) em formato JSON:
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}
O campo id_medico refere-se ao médico que acompanhará o paciente.


2. Listar Todos os Pacientes (GET)
Endpoint: http://localhost:3000/api/pacientes
Método: GET
Descrição: Retorna uma lista de todos os pacientes cadastrados.


3. Atualizar um Paciente Existente (PUT)
Endpoint: http://localhost:3000/api/pacientes/{id}
Método: PUT
Parâmetro: {id} (substitua com o ID do paciente que deseja atualizar)
Corpo (body) em formato JSON:
{
  "nome": "Maria Santa",
  "email": "maria.santa@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}


4. Deletar um Paciente (DELETE)
Endpoint: http://localhost:3000/api/pacientes/{id}
Método: DELETE
Parâmetro: {id} (substitua com o ID do paciente que deseja deletar)


Configuração do Banco de Dados na Azure:

A aplicação utiliza um banco de dados hospedado na Azure para armazenar as informações dos médicos e pacientes. Certifique-se de configurar corretamente as variáveis de ambiente ou arquivos de configuração para conectar à instância do banco de dados na Azure.
