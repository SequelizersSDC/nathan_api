const fs = require('fs');
const argv = require('yargs').argv;
const moment = require('moment');

const lines = argv.lines || 100;
const filename = argv.output || 'questions.csv';
const writeStream = fs.createWriteStream(filename);

var answerCounter = 0;

const username = ['nathansheets1234', 'nsheets97', 'nathans97', 'nathansworld', 'sheetsguy321'];

function RandomMember(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function RandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max)) || 1;
};

const createAnswer = () => {
  var questionCounter = RandomNumber(1000000);
  var answerText = [
    'Lorem ipsum dolor sit amet vim at viderer lobortis eos ubique interesset suscipiantur in. In est omnis disputando at vis utinam hendrerit eloquentiam. At utroque persequeris vix. Ne ignota semper iriure qui modus gloriatur abhorreant ei usu',
    'Id eos odio diam nonumy pro at vero minimum commune. Vim ei essent aliquid oportere te dicunt aeterno corrumpit cum sint gloriatur usu ea. Decore periculis complectitur eu per mel eripuit mediocritatem eu eos at latine volumus reformidans. At purto oportere cum.',
    'Vim te quem veritus admodum. Mel dicam eruditi appellantur et. Summo ancillae mel cu no tempor eligendi quo. Vim iriure eloquentiam te ex has reque quodsi vulputate qui velit numquam referrentur et. Vel nibh elit delenit at velit menandri ex his te ius alia saperet postulant.',
    'Ad eligendi lucilius pri tacimates sadipscing ad nec. Civibus atomorum in his. Homero veritus no sit. Eam populo probatus ad eu mea tale primis no possim virtute delicatissimi eum. Stet eruditi omittam per eu no zril vocent lobortis est.'
  ];
  answerCounter++;

  var answerID = `a${answerCounter}`;
  var questionID = `q${questionCounter}`;
  var itemName = `itemName${questionCounter}`;
  var answerUsername = RandomMember(username);
  var answerText = 'RandomMember(answerText)';
  var postTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  var yesHelpful = RandomNumber(20);
  var noHelpful = RandomNumber(20);

  var output = `${answerID},${questionID},${itemName},${answerUsername},${answerText},${postTime},${yesHelpful},${noHelpful}\n`;
  return output;
}

const startWriting = (writeStream, encoding, done) => {
    let i = lines;

    function writing(){
      let canWrite = true
      do {
        i--;
        let post = createAnswer();
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
writeStream.write(`answerID,questionID,itemName,answerUsername,answerText,postTime,yesHelpful,noHelpful\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(writeStream, 'utf-8', () => {
    writeStream.end()
})

