export default ValidISBN = (isbn) => {
    // Regular expression to check for ISBN-10 or ISBN-13 format
    const regex = /^(?:ISBN(?:-1[03])?:? )?(?=[-0-9 ]{17}$|[-0-9X ]{13}$|[0-9X]{10}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]$/;

    if (regex.test(isbn)) {
        // Remove non ISBN digits, then split into an array
        const chars = isbn.replace(/[^0-9X]/g, "").split("");
        // Remove the final ISBN digit from `chars`, and assign it to `last`
        const last = chars.pop();
        let sum = 0;
        let digit = 10;
        let check;

        if (chars.length === 9) {
            // Compute the ISBN-10 check digit
            for (let i = 0; i < chars.length; i++) {
                sum += digit * parseInt(chars[i], 10);
                digit -= 1;
            }
            check = 11 - (sum % 11);
            if (check === 10) {
                check = "X";
            } else if (check === 11) {
                check = "0";
            }
        } else {
            // Compute the ISBN-13 check digit
            for (let i = 0; i < chars.length; i++) {
                sum += (i % 2 === 0 ? 1 : 3) * parseInt(chars[i], 10);
            }
            check = 10 - (sum % 10);
            if (check === 10) {
                check = "0";
            }
        }

        if (check.toString() === last) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
