#!/bin/bash

# Parameters
KEY_PAIR=keys_deployment_balit
INSTANCE_TYPE="t3.medium"
INSTANCE_COUNT=1

ecs-cli up \
  --keypair $KEY_PAIR  \
  --capability-iam \
  --size $INSTANCE_COUNT \
  --instance-type $INSTANCE_TYPE \
  --tags project=balit-cluster,owner=fer227 \
  --cluster-config balit-profile \
  --ecs-profile balit-profile