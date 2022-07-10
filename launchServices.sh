#!/bin/bash
ecs-cli compose --project-name balit-project  --file docker-compose.yml \
--debug service up  \
--deployment-max-percent 100 --deployment-min-healthy-percent 0 \
--region us-east-1 --ecs-profile balit-profile --cluster-config balit-profile --create-log-groups