const fs = require('fs');
const argv = require('yargs').argv;
const moment = require('moment');

const lines = argv.lines || 100;
const filename = argv.output || 'questions.csv';
const writeStream = fs.createWriteStream(filename);

var questionCounter = 0;

var questionText = 'Hello! This is a sample question. Hello world! Or something like that.';

const username = ['nathansheets1234', 'nsheets97', 'nathans97', 'nathansworld', 'sheetsguy321'];

function RandomMember(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function RandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max)) || 1;
};

const createQuestion = () => {
  questionCounter++;

  var questionID = `q${questionCounter}`;
  var itemName = `itemName${questionCounter}`;
  var questionText = 'questionText';
  var postTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  var posterUsername = RandomMember(username);
  var numAnswers = RandomNumber(4);
  var topAnswerID = RandomNumber(1000000);

  return `${questionID},${itemName},${questionText},${postTime},${posterUsername},${numAnswers},${topAnswerID}\n`;
}

const startWriting = (writeStream, encoding, done) => {
    let i = lines;

    function writing(){
      let canWrite = true
      do {
        i--;
        let post = createQuestion();
        //check if i === 0 so we would write and call `done`
        if(i === 0){
          // we are done so fire callback
          writeStream.write(post, encoding, done)
        } else {
          // we are not done so don't fire callback
          writeStream.write(post, encoding)
        }
        //else call write and continue looping
      } while(i > 0 && canWrite)
      if(i > 0 && !canWrite){
        //our buffer for stream filled and need to wait for drain
        // Write some more once it drains.
        writeStream.once('drain', writing);
      }
    }

    writing();
  }

//write our `header` line before we invoke the loop
writeStream.write(`questionID,itemName,questionText,postTime,posterUsername,numAnswers,topAnswerID\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(writeStream, 'utf-8', () => {
    writeStream.end()
})

