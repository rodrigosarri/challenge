## AWS

Nesta seção, você encontrará informações e procedimentos para testar a AWS SQS e AWS SNS localmente. Siga os passos abaixo em sequência para realizar um teste local.

### 1. Instalação do AWS CLI

Primeiro, instale o AWS CLI de acordo com o seu ambiente operacional. Para orientações detalhadas, consulte a [documentação oficial](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

### 2. Configuração das Credenciais

Configure suas credenciais utilizando o comando:

`aws configure`

**Exemplo de credenciais** (para teste local):

```
AWS Access Key ID: dummy
AWS Secret Access Key: dummy
Default region name: us-east-1
Default output format: json
```

### 3. Crie uma Fila

`aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue`

### 4. Crie um Tópico

`aws --endpoint-url=http://localhost:4566 sns create-topic --name my-topic`

### 5. Preparação da Função Lambda

Acesse a pasta `lambda_function` e crie um arquivo zip:

`cd aws/lambda_function/
zip -r ../my-lambda-function.zip .`

Atrele o arquivo zip à execução automática (note que este passo pode exigir configurações adicionais em um ambiente de produção):

`aws --endpoint-url=http://localhost:4566 lambda create-function --function-name my-function --runtime python3.8 --role arn:aws:iam::000000000000:role/irrelevant --handler lambda_function.lambda_handler --zip-file fileb://my-lambda-function.zip`

### 6. Adicione o Evento na Fila

`aws --endpoint-url=http://localhost:4566 lambda create-event-source-mapping --function-name my-function --batch-size 1 --event-source-arn arn:aws:sqs:us-east-1:000000000000:my-queue`

### 7. Envio de Mensagem

Para enviar uma mensagem, utilize o script em Python com o comando:

```
python sendMessage.py
```
