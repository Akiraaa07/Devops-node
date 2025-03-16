Projeto Node.js CRUD com Banco de Dados na Azure

Este repositório contém a aplicação Node.js que realiza operações CRUD em um banco de dados na nuvem da Azure. Após clonar o repositório, o você poderá realizar os testes das operações utilizando ferramentas como Postman ou Insomnia.

Passos para rodar a aplicação
1. Clonar o repositório
Clone o repositório para o seu ambiente local utilizando o seguinte comando:
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

2. Instalar dependências
Após clonar o repositório, entre na pasta do projeto e instale as dependências utilizando o npm:
cd NOME_DO_REPOSITORIO
npm install

3. Rodar a aplicação
Para rodar a aplicação, execute o seguinte comando:
node server.js
A aplicação estará rodando na porta configurada (por padrão, a porta é 3000). Você poderá acessar a API em http://localhost:3000.

4. Testando o CRUD com Postman ou Insomnia
Você pode usar o Postman ou o Insomnia para testar as operações CRUD da API. As operações disponíveis são:

POST - Médico
Para criar um novo médico, envie uma requisição POST para http://localhost:3000/api/medicos com o seguinte corpo (body) em formato JSON:
{
  "nome": "Dr. João Silva",
  "email": "joao.silva@exemplo.com",
  "crm": "123456",
  "telefone": "(11) 98765-4321"
}

POST - Paciente
Para criar um novo paciente, envie uma requisição POST para http://localhost:3000/api/pacientes com o seguinte corpo (body) em formato JSON:
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}

GET - Médicos
Para listar todos os médicos, envie uma requisição GET para http://localhost:3000/api/medicos.

GET - Pacientes
Para listar todos os pacientes, envie uma requisição GET para http://localhost:3000/api/pacientes.

PUT - Médico
Para atualizar um médico existente, envie uma requisição PUT para http://localhost:3000/api/medicos/id, substituindo id pelo ID do médico que você deseja atualizar. O corpo da requisição deve ser semelhante ao seguinte:
{
  "nome": "Dr. Caio Kenji",
  "email": "caio.kenji@exemplo.com",
  "crm": "101010",
  "telefone": "(11) 98765-4321"
}

PUT - Paciente
Para atualizar um paciente existente, envie uma requisição PUT para http://localhost:3000/api/pacientes/id, substituindo id pelo ID do paciente que você deseja atualizar. O corpo da requisição deve ser semelhante ao seguinte:
{
  "nome": "Maria Santa",
  "email": "maria.santa@exemplo.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 99876-5432",
  "id_medico": 1
}

DELETE - Médico
Para deletar um médico, envie uma requisição DELETE para http://localhost:3000/api/medicos/id, substituindo id pelo ID do médico que você deseja deletar.

DELETE - Paciente
Para deletar um paciente, envie uma requisição DELETE para http://localhost:3000/api/pacientes/id, substituindo id pelo ID do paciente que você deseja deletar.
