async function convertCurrency() {
    // Get user input
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from_currency").value;
    const toCurrency = document.getElementById("to_currency").value;
    const resultDiv = document.getElementById("result");

    // Clear previous result or error
    resultDiv.innerText = "";
    resultDiv.classList.remove("error");

    // Check if amount is valid
    if (!amount || isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Please enter a valid amount.";
        resultDiv.classList.add("error");
        return;
    }

    // Fetch exchange rates from an API
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        // Check if the API response is valid
        if (!data || !data.rates) {
            throw new Error("Failed to fetch exchange rates. Please try again later.");
        }

        // Get the conversion rate
        const rate = data.rates[toCurrency];
        if (!rate) {
            throw new Error("Invalid currency code. Please check your selections.");
        }

        // Calculate the converted amount
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the result
        resultDiv.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultDiv.innerText = "Error: " + error.message;
        resultDiv.classList.add("error");
    }
}