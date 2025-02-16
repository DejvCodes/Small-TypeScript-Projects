import inquirer from "inquirer"
import chalk from "chalk"

// Interface pro odpovědi uživatele
interface Answers {
    userID: string
    userPIN: number
    transactionType: string
    quickAmount: number
    customAmount: number
    depositAmount: number
}

// Výchozí zůstatek
let balance: number = 10000

// Funkce pro formátování částky
const formatPrice = (value: number, locale = 'cs-CZ', currency = 'CZK') => {
    return Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Funkce ATM
const atm = async (): Promise<void> => {
    try {
        // Získání vstupních hodnot od uživatele
        const answers: Answers = await inquirer.prompt([
            {
                type: "input",
                name: "userID",
                message: "Zadejte své uživatelské ID: ",
                validate: (input: string) => {
                    if (input.trim() === "") {
                        return "Zadejte prosím své uživatelské ID: "
                    }
                    return true
                },
            },
            {
                type: "password",
                name: "userPIN",
                message: "Zadejte svůj čtyřmístný uživatelský PIN: ",
                validate: (password: string) => {
                    if (!/^\d{4}$/.test(password)) {
                        return "PIN musí být čtyřmístné číslo (0000 - 9999)."
                    }
                    return true
                },
                filter: (password: string) => Number(password),
                mask: "*",
            },
            {
                type: "list",
                name: "transactionType",
                choices: ["Rychlý výběr", "Výběr", "Vklad"],
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
                validate: (input: string) => {
                    const amountAsNum: number = parseInt(input)
                    const numberRegex: RegExp = /^\d+$/
                    if (!numberRegex.test(input) || amountAsNum <= 0) {
                        return "Zadejte platnou částku pro výběr!"
                    }
                    if (amountAsNum > balance) {
                        return "Nedostatek peněz na účtě."
                    }
                    return true
                },
                when: (answers) => answers.transactionType === "Výběr",
                filter: (input: string) => Number(input)
            },
            {
                type: "input",
                name: "depositAmount",
                message: "Zadejte částku pro vklad: ",
                validate: (input: string) => {
                    const amountAsNum: number = parseInt(input)
                    const numberRegex: RegExp = /^\d+$/
                    if (!numberRegex.test(input) || amountAsNum <= 0) {
                        return "Zadejte platnou částku pro vklad!"
                    }
                    return true
                },
                when: (answers) => answers.transactionType === "Vklad",
                filter: (input: string) => Number(input)
            },
        ])
        // console.log(answers)

        // Destructuring
        const { quickAmount, customAmount, depositAmount, transactionType } = answers

        // Oveření zůstatku
        if (transactionType === "Vklad") {
            balance += depositAmount
            console.log(chalk.green(`Vklad byl úspěšný! Nový zůstatek: ${formatPrice(balance)}.`))
        } else {
            const withdrawalAmount = quickAmount || customAmount || 0;

            if (withdrawalAmount > balance) {
                console.log(chalk.red("Nedostatek peněz na účtě."))
            } else {
                balance -= withdrawalAmount
                console.log(chalk.green(`Výběr byl úspěšný! Na účtě zbývá: ${formatPrice(balance)}.`))
            }
        }

    } catch (error) {
        console.error(chalk.red("Nastala chyba ve funkci ATM: "), error)
    }
}

// Spuštění funkce
atm()