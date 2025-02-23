import inquirer from "inquirer"

// Interface pro odpověď uživatele
interface Answer {
    sentence: string
}

const WordCounter = async (): Promise<void> => {
    // Získání vstupní hodnoty od uživatele
    const answer: Answer = await inquirer.prompt([
        {
            type: "input",
            name: "sentence",
            message: "Zadejte větu pro výpočet slov: ",
            validate: (input: string) => {
                if (typeof input !== "string" || input.trim().length === 0) {
                    return "Prosím, zadejte platnou větu."
                }
                return true
            }
        }
    ])

    // Rozdělení věty na slova
    const words = answer.sentence.trim().split(/\s+/)

    // Výpis počtu slov
    console.log(`Počet slov ve větě: ${words.length}`)
}

// Spuštění funkce
WordCounter()