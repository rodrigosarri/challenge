import boto3

sqs = boto3.client("sqs", region_name="us-east-1", endpoint_url="http://localhost:4566")

queue_url = "http://localhost:4566/000000000000/my-queue"

response = sqs.receive_message(
  QueueUrl=queue_url,
  AttributeNames=["All"],
  MaxNumberOfMessages=1,
  WaitTimeSeconds=10,
)

messages = response.get("Messages", [])
if messages:
  for message in messages:
    print(f"Received message: {message['Body']}")
