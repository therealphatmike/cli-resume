#! usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");

const response = chalk.bold.blue;
const resumeContent = chalk.bold.white;

const resume = require("./resume.json");
const welcomeMessage = "Hello. Welcome to T Michael Smith's CLI resume.";

const resumePrompts = {
    type: "list",
    name: "resumeOptions",
    message: "Which part of my resume would you like to view?",
    choices: [...Object.keys(resume), "Exit"]
};

function main() {
    console.log(resumeContent(welcomeMessage));
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts)
        .then(answer => {
            if (answer.resumeOptions === "Exit") {
                return;
            }
            let option = answer.resumeOptions;
            console.log(response("----------------------------------------------------------------------------"));
            resume[`${option}`].forEach(info => {
                console.log(response("|   => ") + resumeContent(info));
            });
            console.log(response("----------------------------------------------------------------------------"));
            inquirer.prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
                .then(choice => {
                    if (choice.exitBack === "Exit") {
                        return;
                    } else {
                        resumeHandler();
                    }
                });
        });
}

main();