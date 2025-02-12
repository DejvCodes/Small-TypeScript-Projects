// Knihovna, která umožňuje se ptát uživatele na vstupy v příkazovém řádku
import inquirer from "inquirer";
// Funkce pro ukončení programu s chybovou zprávou
const exitWithError = (message) => {
    console.log(message);
    process.exit(1); // Ukončí program
};
// Funkce pro provedení výpočtu
const performCalculation = async () => {
    // Získání vstupů od uživatele
    const answer = await inquirer.prompt([
        {
            type: "number",
            name: "firstNumber",
            message: "Zadejte prosím první číslo: ",
        },
        {
            type: "number",
            name: "secondNumber",
            message: "Zadejte prosím druhé číslo: ",
        },
        {
            type: "list",
            name: "operator",
            choices: ["*", "+", "-", "/"],
            message: "Zvolnte operátor: ",
        },
    ]);
    // console.log(answer)
    // Destructuring
    const { firstNumber, secondNumber, operator } = answer;
    // Validace: Kontrola, zda jsou obě čísla platná
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        exitWithError("Zadejte platná čísla!");
    }
    let result = 0;
    // Výpočet na základě zvoleného operátoru
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
            if (secondNumber === 0) {
                exitWithError("Nelze dělit nulou!");
            }
            else {
                result = firstNumber / secondNumber;
            }
            break;
        default:
            exitWithError("Neplatný operátor!");
    }
    // Zobrazení výsledku
    console.log(`Váš výsledek je: ${result}`);
    // Dotaz, zda chce uživatel provést další výpočet
    const again = await inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Chcete provést další výpočet?",
            default: false,
        }
    ]);
    // console.log(again)
    // Pokud ano, provede se další výpočet
    if (again) {
        performCalculation();
    }
};
// Volání funkce
performCalculation();
