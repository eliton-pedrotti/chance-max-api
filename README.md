
Basicamente a API foi feita utilizando NestJS, banco de dados Postgres e TypeORM
Pra executar ela, é preciso rodar o docker-compose, pra subir a imagem do banco, e rodar o comando do
package json

npm run start:dev

Pra rodar em ambiente de producao, basta rodar o outro comando 

npm run start:prod

No arquivo .env, temos algumas variaveis

API_TOKEN -> é o token da api do sportmonks, entao, pra conseguir executar a api e ela popular a base, é preciso de um token funcional

DATABASE_URI -> é a URL da base que será utilizada em ambiente de producao, no exemplo que está no .env, é a URL que o heroku nos disponibilizou em ambiente de homologacao.

PAGSEGURO_TOKEN -> é o token responsavel pelo meio de pagamentos, o Andrey deverá disponibilizar esse token da conta dele.

ENDPOINT_STATISTICS -> é a URL BASE do endpoint da api statistics feita em python.

BASE_URL_SPORTMONKS -> é o endpoint da API do sportmonks, nao precisa alterá-la.

BASE_URL_PAGSEGURO -> é o endpoint do pagseguro onde devera ser alterado para a URL de producao, a principio deve se remover o SANDBOX do nome da url, mas pode certificar-se acessando https://acesso.pagseguro.uol.com.br/sandbox e entrando com os dados, lá tem uma explicação mais detalhada.
