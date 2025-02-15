import inquirer from "inquirer";
import chalk from "chalk";
// Funkce pro generování náhodného čísla od 1 do 10
const generateNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
};
// Funkce pro hádání náhodného čísla.
const guessANumber = async () => {
    // Generování nového čísla při každém kole
    const numberGeneration = generateNumber();
    try {
        // Dotaz na uživatele pro hádání čísla
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "userGuess",
                message: "Hádej číslo od 1 do 10!",
                validate: (input) => {
                    const num = parseInt(input);
                    if (isNaN(num)) {
                        return "Zadejte prosím platné číslo.";
                    }
                    if (num < 1 || num > 10) {
                        return "Číslo musí být mezi 1 a 10.";
                    }
                    return true;
                },
                filter: (input) => parseInt(input)
            }
        ]);
        // Uložení odpovědi do proměnné
        const userGuess = answer.userGuess;
        // Validace, zda uživatel uhodl číslo
        if (userGuess === numberGeneration) {
            console.log(chalk.green("Tvoje odpověď je správná!"));
        }
        else {
            console.log(chalk.red("Špatně, zkus to znovu."));
        }
        console.log(`Tvé číslo: ${userGuess}. Vygenerované číslo: ${numberGeneration}`);
        // Dotaz, zda chce uživatel pokračovat
        const again = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Chceš hádat dál?",
                default: false,
            }
        ]);
        // Pokud ano, zavolá se funkce
        if (again.again) {
            return guessANumber();
        }
        else {
            console.log("Konec hry, díky za účast!", chalk.green(":-)"));
        }
    }
    catch (error) {
        console.error("Nastala chyba při hře:", error);
    }
};
// Spuštění funkce
guessANumber();
