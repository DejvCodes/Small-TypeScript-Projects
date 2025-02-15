// Knihovna, která umožňuje se ptát uživatele na vstupy v příkazovém řádku
import inquirer from "inquirer";
// Funkce pro zobrazení chyby
const showError = (message) => {
    console.log(message);
    // process.exit(1) // Ukončí program
};
// Funkce pro provedení výpočtu
const performCalculation = async () => {
    try {
        // Získání vstupních hodnot od uživatele
        const answers = await inquirer.prompt([
            {
                type: "input", // input je lepší, protože number může vrátit NaN
                name: "firstNumber",
                message: "Zadejte první číslo: ",
                validate: (input) => {
                    const numberRegex = /^[+-]?\d+(\.\d+)?$/; // Povolit čísla, včetně desetin
                    if (!numberRegex.test(input.trim())) {
                        return "Zadejte platné číslo!";
                    }
                    return true;
                },
                filter: (input) => parseFloat(input), // Převod na číslo
            },
            {
                type: "input",
                name: "secondNumber",
                message: "Zadejte druhé číslo: ",
                validate: (input) => {
                    const numberRegex = /^[+-]?\d+(\.\d+)?$/; // Povolit čísla, včetně desetin
                    if (!numberRegex.test(input.trim())) {
                        return "Zadejte platné číslo!";
                    }
                    return true;
                },
                filter: (input) => parseFloat(input), // Převod na číslo
            },
            {
                type: "list",
                name: "operator",
                choices: ["*", "+", "-", "/"],
                message: "Zvolte operátor: ",
            },
        ]);
        // console.log(answers)
        // Destructuring
        const { firstNumber, secondNumber, operator } = answers;
        let result = 0;
        // Validace dělení nulou
        if (operator === "/" && secondNumber === 0) {
            showError("Nelze dělit nulou! Zadejte jiné číslo.");
            return performCalculation();
        }
        // Výpočet podle operátoru
        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                result = firstNumber / secondNumber;
                break;
            default:
                showError("Neplatný operátor!");
        }
        // Výpis výsledku
        console.log(`Výpočet: ${firstNumber} ${operator} ${secondNumber} = ${result}`);
        // Dotaz na opakování výpočtu
        const again = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Chcete provést další výpočet?",
                default: false,
            }
        ]);
        // console.log(again.again)
        // Pokud ano, provede se další výpočet
        if (again.again) {
            return performCalculation();
        }
        else {
            console.log("Kalkulačka byla úspěšně ukončena.");
        }
    }
    catch (error) {
        console.error("Nastala chyba při výpočtu:", error);
    }
};
// Spuštění kalkulačky
performCalculation();
