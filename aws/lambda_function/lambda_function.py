import json
import time
import requests
import boto3

def lambda_handler(event, context):
  time.sleep(5)

  for record in event["Records"]:
    body = record["body"]
    message = json.loads(body)

    # api_url = "http://localhost:3000/api/messages/"
    api_url = "http://host.docker.internal:3000/api/messages/"
    response = requests.post(api_url, json=message)

    if response.status_code == 200:
      print(f"Mensagem postada na API: {message}")
    else:
      print(f"Falha ao enviar dados na API: {response.content}")

  sns = boto3.client("sns", region_name="us-east-1", endpoint_url="http://localhost:4566")
  sns_topic_arn = "arn:aws:sns:us-east-1:000000000000:my-topic"

  sns_response = sns.publish(
    TopicArn=sns_topic_arn,
    Message="Mensagem processada com sucesso",
    Subject="Notificação de Lambda",
  )

  if sns_response.get('MessageId'):
    print(f"Publicado mensagem em SNS: {sns_response['MessageId']}")
  else:
    print("Falha ao publicar mensagem em SNS")

  return {
    "statusCode": 200,
    "body": json.dumps("Função executada corretamente")
  }
