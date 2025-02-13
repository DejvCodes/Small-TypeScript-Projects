import inquirer from "inquirer";
// Funkce pro generování náhodného čísla od 1 do 10
const generateNumber = () => {
    return Math.ceil(Math.random() * 10);
};
// Funkce pro hádání náhodného čísla.
const guessANumber = async () => {
    // Generování nového čísla při každém kole
    const numberGeneration = generateNumber();
    try {
        // Dotaz na uživatele pro hádání čísla
        const answer = await inquirer.prompt([
            {
                type: "number",
                name: "userGuess",
                message: "Hádej od 1 do 10, jaké číslo bylo vygenerováno!",
                validate: (number) => {
                    if (number === null || isNaN(Number(number))) {
                        return "Zadejte prosím platné číslo.";
                    }
                    if (Number(number) < 1 || Number(number) > 10) {
                        return "Číslo musí být mezi 1 a 10.";
                    }
                    return true;
                },
                filter: (number) => Number(number)
            }
        ]);
        // Uložení odpovědi do proměnné
        const userGuess = answer.userGuess;
        // Validace, zda uživatel uhodl číslo
        if (userGuess === numberGeneration) {
            console.log("Tvoje odpověď je správná!");
        }
        else {
            console.log("Špatně, zkus to znovu.");
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
            console.log("Konec hry, díky za účast!");
        }
    }
    catch (error) {
        console.error("Nastala chyba při hře:", error);
    }
};
// Spuštění funkce
guessANumber();
