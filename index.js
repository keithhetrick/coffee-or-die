#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Play Coffee or Die? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlueBright("HOW TO PLAY")} 
    Get ready to answer the most important questions of your life.
    If you get a question wrong, assassins will show up to ${chalk.bold.redBright(
      "KILL"
    )} me & my whole family!
    So please, get all the questions right...or you'll be complicit in ${chalk.bold.redBright(
      "murder"
    )}.
    Here we go...let's play Coffee or Die
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `${chalk.bgBlueBright(
        "Way to pick the " +
          `${chalk.bold.redBright("OBVIOUS")}` +
          " answer " +
          `${playerName}` +
          ", guess I won't die for now"
      )}`,
    });
  } else {
    spinner.error({
      text: `${chalk.bgBlue(
        "💀💀💀 LOL Game over " +
          `${playerName}` +
          ", you're not " +
          `${chalk.bold.redBright("BASED")}` +
          " enough for coffee ☕☕☕."
      )}`,
    });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(
    `Congrats , ${playerName} !\n You win... \n a prize, or something`,
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + "\n");

      console.log(
        chalk.green(
          `Thanks for playing my first command line game. Now hire me`
        )
      );
      process.exit(0);
    }
  );
}

// Questions
async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Cold Brew, French Press, Keurig, Drip?\n",
    choices: ["Yes", "Of course", "Always", "None for me, thanks"],
  });

  return handleAnswer(answers.question_1 !== "None for me, thanks");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Should I get coffee now or later?\n",
    choices: [
      "Yes",
      "I don't understand the question",
      "I get jittery with too much caffine, so I'll pass for now",
      "Of course",
      "Always",
    ],
  });
  return handleAnswer(
    answers.question_2 !==
      "I get jittery with too much caffine, so I'll pass for now"
  );
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Does decaf work for you?",
    choices: [
      "No",
      "No, but said in an annoyed tone",
      "Yes",
      "Yes, but said sarcastically",
      "I don't understand the question",
      ":: slaps whoever asked the question ::",
      "How many victims have you claimed this week Karen? You sound like a psycopath asking people 'does decaf work for you.' Get your life together, only serial killers drink decaf",
      "A needle through the esophagus has a better kick to it",
    ],
  });

  return handleAnswer(answers.question_3 !== "Yes");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is NOT going to happen?\n",
    choices: [
      "get a refill",
      "hook up a IV/drip line of French Press directly into my veins",
      "I'm good, I've had enough coffee for today",
      "yell at Karen from HR for taking the last cup without starting a new pot",
    ],
  });
  return handleAnswer(
    answers.question_4 === "I'm good, I've had enough coffee for today"
  );
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "Your family is held captive by a crew of skilled, yet ruthless assassins.\n" +
      "They put you in the horrible predicament of having to choose between\n" +
      "sparing the lives of your loved ones, or give up coffee forever.\n" +
      "Your answer would be: '____'",
    choices: [
      "'My god! Anything to save my family'",
      "'Take me instead, you monsters!'",
      "'You'll never get away with this!'",
      "'Oh nooo what a conundrum! LOL JK. Bye fam, it was fun while it lasted' \n:: high fives assassins while sipping a fresh cup of coffee ::",
    ],
  });

  return handleAnswer(
    answers.question_5 ===
      "'Oh nooo what a conundrum! LOL JK. Bye fam, it was fun while it lasted' \n:: high fives assassins while sipping a fresh cup of coffee ::"
  );
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Was this little game worth the few minutes of your time?\n",
    choices: [
      "Of course, it was as wholesome & wonderful experience. I can live the rest of my life for the better now",
      "Are you serious? Of course not, what an absolute waste of my time. I'll never get that 3 min of my life back & I despise your very existence for putting me through this",
    ],
  });

  return handleAnswer(
    answers.question_6 !==
      "Of course, it was as wholesome & wonderful experience. I can live the rest of my life for the better now"
  );
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
winner();
