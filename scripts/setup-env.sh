#!/bin/bash

# Check if "env" argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <env> <namespace>"
  echo "Example: $0 production ctc"
  exit 1
fi

# Set environment variable
ENV=$1
NAMESPACE=$2

# Define your parameter names based on the environment
declare -a params=("/${NAMESPACE}/${ENV}/cognito-user-pool-id" "/${NAMESPACE}/${ENV}/cognito-client-id" "/${NAMESPACE}/${ENV}/cognito-google-client-id")

# Name of the output environment file
env_file=".env"

# Clear the env file to avoid appending to an existing file
> "$env_file"

# Fetch and write parameters to the env file
for param in "${params[@]}"; do
  # Fetch parameter value using AWS CLI
  value=$(aws ssm get-parameter --name "$param" --with-decryption --query "Parameter.Value" --output text 2>&1)

  # Check if the AWS CLI command was successful
  if [ $? -ne 0 ]; then
    echo "Error fetching parameter: $param"
    echo "AWS CLI Error: $value" # $value holds the error output from AWS CLI
  fi

  # Check if the fetched value is empty
  if [ -z "$value" ]; then
    echo "Error: Parameter value for $param is empty."
  fi
  # Extract parameter name for the env file
  param_name=$(basename "$param")
  if [[ $(basename "$param") == *"cognito-user-pool-id"* ]]; then
    param_name=REACT_APP_COGNITO_USER_POOL_ID
  fi
  if [[ $(basename "$param") == *"cognito-client-id"* ]]; then
    param_name=REACT_APP_COGNITO_CLIENT_ID
  fi
  if [[ $(basename "$param") == *"cognito-google-client-id"* ]]; then
    param_name=REACT_APP_COGNITO_GOOGLE_CLIENT_ID
  fi


  # Write to the env file
  echo "${param_name}=${value}" >> "$env_file.$ENV"
done

echo "Environment variables written to $env_file.$ENV"
