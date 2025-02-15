import inquirer from "inquirer";
import chalk from "chalk";
// Funkce ATM
const atm = async () => {
    try {
        // Získání vstupních hodnot od uživatele
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "userID",
                message: "Zadejte své uživatelské ID: ",
                validate: (input) => {
                    if (input.trim() === "") {
                        return "Zadejte prosím své uživatelské ID: ";
                    }
                    return true;
                },
            },
            {
                type: "password",
                name: "userPIN",
                message: "Zadejte svůj čtyřmístný uživatelský PIN: ",
                validate: (password) => {
                    if (!/^\d{4}$/.test(password)) {
                        return "PIN musí být čtyřmístné číslo (0000 - 9999).";
                    }
                    return true;
                },
                filter: (password) => Number(password),
                mask: "*",
            },
            {
                type: "list",
                name: "accountType",
                choices: ["Běžný účet", "Spořící účet"],
                message: "Zadejte typ svého bankovního účtu: ",
            },
            {
                type: "list",
                name: "transactionType",
                choices: ["Rychlý výběr", "Výběr"],
                message: "Vyberte typ transakce",
            },
            {
                type: "list",
                name: "quickAmount",
                choices: [
                    { name: "1000 Kč", value: 1000 },
                    { name: "2000 Kč", value: 2000 },
                    { name: "3000 Kč", value: 3000 },
                    { name: "5000 Kč", value: 5000 },
                ],
                message: "Vyberte částku pro rychlý výběr: ",
                when: (answers) => answers.transactionType === "Rychlý výběr",
            },
            {
                type: "input",
                name: "customAmount",
                message: "Zadejte částku pro výběr: ",
                validate: (input) => {
                    const amountAsNum = parseInt(input);
                    if (isNaN(amountAsNum) || amountAsNum <= 0) {
                        return "Zadejte platnou částku pro výběr!";
                    }
                    return true;
                },
                when: (answers) => answers.transactionType === "Výběr",
                filter: (input) => Number(input)
            },
        ]);
        // console.log(answers)
        // Destructuring
        const { quickAmount, customAmount } = answers;
        // Určení správné částky
        const enteredAmount = quickAmount ?? customAmount ?? 0;
        // Výchozí zůstatek
        const balance = 10000;
        // Oveření zůstatku
        if (enteredAmount > 0 && balance >= enteredAmount) {
            const remaining = balance - enteredAmount;
            console.log(chalk.green(`Výběr byl úspěšný! Na účtě Vám zbývá: ${remaining} Kč.`));
        }
        else {
            console.log(chalk.red("Nedostatek peněz na účtě."));
        }
    }
    catch (error) {
        console.error(chalk.red("Nastala chyba ve funkci ATM: "), error);
    }
};
// Spuštění funkce
atm();
