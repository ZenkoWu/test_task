export const addPhoneMask = (phoneInput: any) => { //e.target

    const getInputNumbersValue = (input: any) => {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }


    const onPhoneInput = function (phoneInput: any) {
            let inputNumbersValue = getInputNumbersValue(phoneInput)
            let selectionStart = phoneInput.selectionStart
            let formattedInputValue = "";

        if (!inputNumbersValue) {
            return "";
        }
        if (phoneInput.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (phoneInput.data && /\D/g.test(phoneInput.data)) {
                // Attempt to input non-numeric symbol
                phoneInput.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = phoneInput.value = firstSymbols + " ";

            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }

        return formattedInputValue;
    }

    return onPhoneInput(phoneInput);
}