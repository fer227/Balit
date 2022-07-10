#!/bin/bash
# Credentials
AWS_ACCESS_KEY_ID="" \
AWS_SECRET_ACCESS_KEY="" \
AWS_REGION="us-east-1" 

# Config
PROFILE_NAME=balit-profile
CLUSTER_NAME=balit-cluster
REGION=$AWS_REGION
LAUNCH_TYPE=EC2

# Create profile
ecs-cli configure profile --profile-name "$PROFILE_NAME" --access-key "$AWS_ACCESS_KEY_ID" --secret-key "$AWS_SECRET_ACCESS_KEY"

# Define cluster
ecs-cli configure --cluster "$CLUSTER_NAME" --default-launch-type "$LAUNCH_TYPE" --region "$REGION" --config-name "$PROFILE_NAME"

# Create keys to access de cluster (required)
aws ec2 create-key-pair --key-name keys_deployment_balit --region "$REGION" --query 'KeyMaterial' --output text > ~/.ssh/keys_deployment_balit.pem