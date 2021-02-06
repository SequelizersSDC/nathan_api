const client = require('./index.js');

const SeedDatabase = () => {
    CreateQuestionsTable();
    CreateAnswersTable();
    SeedAll();
};

const CreateQuestionsTable = () => {
    const dropquery = `DROP TABLE IF EXISTS questions;`;
    client.query(dropquery, (err, res) => {
        if (err) {
            console.log('Drop error:', err);
            return;
        }
        console.log('Question table dropped.');
    });

    const query = `
    CREATE TABLE questions (
        questionID VARCHAR (10) PRIMARY KEY,
        itemName VARCHAR (100) NOT NULL,
        questionText VARCHAR (1000),
        postTime TIMESTAMP,
        posterUsername VARCHAR (30),
        numAnswers INT,
        topAnswerID INT
        );
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Question table is successfully created');
    });
};

const CreateAnswersTable = () => {
    const dropquery = `DROP TABLE IF EXISTS answers;`;
    client.query(dropquery, (err, res) => {
        if (err) {
            console.log('Drop error:', err);
            return;
        }
        console.log('Answers table dropped.');
    });

    const query = `
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
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Answers table is successfully created');
    });
};

const SeedAll = () => {
    answerCounter = 0;
    recordsToCreate = 100000;
    for (let i = 1; i <= recordsToCreate; i++) {
        //Start by creating question, then hold onto questionID/itemName to create 0-3 answers

        numAnswers = RandomNumber(3);

        var questionQuery = `
        INSERT INTO questions
        (questionID, itemName, questionText, postTime, posterUsername, numAnswers, topAnswerID)
        VALUES
        ('q${i}', 'itemName${i}', '${questionText}', current_timestamp, 
        '${RandomMember(username)}', ${numAnswers}, ${answerCounter})
        `;

        client.query(questionQuery, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
        })

        // Question has been created
        // Now create associated answers

        for (let j = 0; j < numAnswers; j++) {
            answerCounter++;

            var answerQuery = `
            INSERT INTO answers
            (answerID, questionID, itemName, answerUsername, answerText, postTime, yesHelpful, noHelpful)
            VALUES
            ('a${answerCounter}', 'q${i}${j}', 'itemName${i}', '${RandomMember(username)}', 
            '${RandomMember(answerText)}', current_timestamp, ${RandomNumber(10)}, ${RandomNumber(10)})`;

            client.query(answerQuery, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
            })
        }
            
    }

    console.log(`Database successfully seeded with ${recordsToCreate} questions and ${answerCounter} answers.`)
}

// Sample information to pull from below:

var questionText = 'Hello! This is a sample question. Hello, world! Or something like that.';

var answerText = [
    'Lorem ipsum dolor sit amet, vim at viderer lobortis, eos ubique interesset suscipiantur in. In est omnis disputando, at vis utinam hendrerit eloquentiam. At utroque persequeris vix. Ne ignota semper iriure qui, modus gloriatur abhorreant ei usu',
    'Id eos odio diam nonumy, pro at vero minimum commune. Vim ei essent aliquid oportere, te dicunt aeterno corrumpit cum, sint gloriatur usu ea. Decore periculis complectitur eu per, mel eripuit mediocritatem eu, eos at latine volumus reformidans. At purto oportere cum.',
    'Vim te quem veritus admodum. Mel dicam eruditi appellantur et. Summo ancillae mel cu, no tempor eligendi quo. Vim iriure eloquentiam te, ex has reque quodsi vulputate, qui velit numquam referrentur et. Vel nibh elit delenit at, velit menandri ex his, te ius alia saperet postulant.',
    'Ad eligendi lucilius pri, tacimates sadipscing ad nec. Civibus atomorum in his. Homero veritus no sit. Eam populo probatus ad, eu mea tale primis, no possim virtute delicatissimi eum. Stet eruditi omittam per eu, no zril vocent lobortis est.'
  ];

var username = ['nathansheets1234', 'nsheets97', 'nathans97', 'nathansworld', 'sheetsguy321'];

function RandomMember(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function RandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max)) || 1;
};


module.exports = SeedDatabase;
SeedDatabase();