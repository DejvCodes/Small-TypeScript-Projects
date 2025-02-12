// Knihovna, která umožňuje se ptát uživatele na vstupy v příkazovém řádku
import inquirer from "inquirer"

// Interface pro odpovědi uživatele
interface Answer {
    firstNumber: number
    secondNumber: number
    operator: string
}

// Interface pro opakování výpočtu
interface Again {
    again: boolean
}

// Funkce pro zobrazení chyby
const showError = (message: string) => {
    console.log(message)
    // process.exit(1) // Ukončí program
}

// Funkce pro provedení výpočtu
const performCalculation = async (): Promise<void> => {
    try {
        // Získání vstupních hodnot od uživatele
        const answer: Answer = await inquirer.prompt([
            {
                type: "number",
                name: "firstNumber",
                message: "Zadejte prosím první číslo: ",
                validate: (number) => {
                    if (number === null || isNaN(Number(number))) {
                        return "Zadejte platné číslo!"
                    }
                    return true
                },
                // filter: (number) => Number(number), // Převod vstupu na číslo
            },
            {
                type: "number",
                name: "secondNumber",
                message: "Zadejte prosím druhé číslo: ",
                validate: (number) => {
                    if (number === null || isNaN(Number(number))) {
                        return "Zadejte platné číslo!"
                    }
                    return true
                },
                // filter: (number) => Number(number), // Převod vstupu na číslo
            },
            {
                type: "list",
                name: "operator",
                choices: ["*", "+", "-", "/"],
                message: "Zvolte operátor: ",
            },
        ])
        // console.log(answer)

        // Destructuring
        const { firstNumber, secondNumber, operator } = answer
        let result: number = 0

        // Výpočet podle operátoru
        switch (operator) {
            case "+":
                result = firstNumber + secondNumber
                break
            case "-":
                result = firstNumber - secondNumber
                break
            case "*":
                result = firstNumber * secondNumber
                break
            case "/":
                if (secondNumber === 0) {
                    showError("Nelze dělit nulou!")
                    return performCalculation()
                } else {
                    result = firstNumber / secondNumber
                }
                break
            default:
                showError("Neplatný operátor!")
        }

        // Výpis výsledku
        console.log(`Váš výsledek je: ${result}`)

        // Dotaz na opakování výpočtu
        const again: Again = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Chcete provést další výpočet?",
                default: false,
            }
        ])
        // console.log(again.again)

        // Pokud ano, provede se další výpočet
        if (again.again) {
            return performCalculation()
        } else {
            console.log("Kalkulačka byla úspěšně ukončena.")
        }
    } catch (error) {
        console.error("Nastala chyba při výpočtu:", error)
    }
}

// Spuštění kalkulačky
performCalculation()