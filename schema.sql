\c questions;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE questions (
    questionID VARCHAR (10) PRIMARY KEY,
    itemName VARCHAR (100) NOT NULL,
    questionText VARCHAR (1000),
    postTime TIMESTAMP,
    posterUsername VARCHAR (30),
    numAnswers INT,
    topAnswerID INT
);

CREATE TABLE answers (
    answerID VARCHAR (10) PRIMARY KEY,
    questionID VARCHAR (10),
    itemName VARCHAR (100),
    answerUsername VARCHAR (30),
    answerText VARCHAR (1000),
    postTime TIMESTAMP,
    yesHelpful INT,
    noHelpful INT
);

