# Node.js

**Informações sobre a API em Node.js**

Esta API foi desenvolvida utilizando **TypeScript**, aderindo às melhores práticas de desenvolvimento. Optamos pela biblioteca **Sequelize** como nossa ferramenta ORM. Além disso, fornecemos dois scripts de teste para atender às necessidades específicas de desenvolvedores: um para ambientes Windows e outro para ambientes Linux.

## Configuração Inicial

Adicione um arquivo `.env` na raiz do projeto com as seguintes variáveis (substitua os dados pelos dados corretos de banco de dados):

```
API_HOST=localhost
API_PORT=3000
DB_HOST=localhost
DB_USER=app_user
DB_NAME=app_db
DB_PASS=app_password
DB_DIALECT=mysql
```

## Testando em Ambiente Pré-Produção

Para simular o ambiente pré-produção, siga os passos:

Instale os pacotes através do comando
	`npm install`

Gere o build do projeto com o comando:
    `npm run build`

-   Execute o script correspondente ao seu sistema operacional:
	-   **Windows**:
	`npm run devWindows`

	-   **Linux**:
	 `npm run devLinux`
