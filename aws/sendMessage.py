import boto3
import json

sqs = boto3.client("sqs", region_name="us-east-1", endpoint_url="http://localhost:4566")

queue = sqs.create_queue(QueueName="my-queue")
queueUrl = queue["QueueUrl"]

message = {
  "id": 1,
  "name": "João Mário",
  "email": "joao.mario@example.com",
  "age": 30
}

sqs.send_message(QueueUrl=queueUrl, MessageBody=json.dumps(message))
