import inquirer from "inquirer";
import chalk from "chalk";
const wordCounter = async () => {
    try {
        // Získání vstupní hodnoty od uživatele
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "sentence",
                message: "Zadejte větu pro výpočet slov: ",
                validate: (input) => {
                    if (typeof input !== "string" || input.trim().length === 0) {
                        return "Prosím, zadejte platnou větu.";
                    }
                    return true;
                }
            }
        ]);
        // Rozdělení věty na slova
        const words = answer.sentence.trim().split(/\s+/);
        // Výpis počtu slov
        console.log(chalk.blue(`Počet slov ve větě: `), chalk.bold(`${words.length}`));
        // Dotaz na opakování výpočtu
        const again = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Chceš zadat další větu?",
                default: false,
            }
        ]);
        // Pokud ano, zavolá se funkce
        if (again.again) {
            return wordCounter();
        }
        else {
            console.log("WordCounter byl ukončen", chalk.green(":-)"));
        }
    }
    catch (error) {
        console.log(chalk.red("Nastala chyba ve funkci WordCounter: "), error);
    }
};
// Spuštění funkce WordCounter
wordCounter();
