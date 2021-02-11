#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="questions"
USER="postgres"

# Output Filename for Faker File
OUTPUT="/database/questions.csv"
FILEPATH="$DIR/$OUTPUT"
# if parameter 1 is not passed as argument default records to be generated to 1000000
LINES=${1:-1000000}

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
SCHEMA="$DIR/schema.sql"
PGPASSWORD='password' psql -U $USER < schema.sql

### Run Our Generator Script ###
node database/seedQuestions.js --output=$FILEPATH --lines=1000000

Table="questions"

### Import Our .csv file to seed Database ###
PGPASSWORD='password' psql -U $USER -d $DATABASE -c "COPY $Table FROM '$FILEPATH' CSV HEADER";

AnswerOutput="/database/answers.csv"
AnswerPath="$DIR/$AnswerOutput"
Table="answers"

LINES=${1:-1000000}

### Run answer generator Script
node database/seedAnswers.js --output=$AnswerPath --lines=1000000

#Import csv to database
PGPASSWORD='password' psql -U $USER -d $DATABASE -c "COPY $Table FROM '$AnswerPath' CSV HEADER";