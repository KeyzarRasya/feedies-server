function generateString(plain) {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let ascii = "";
    let asciiLen = ascii.length;

    while (asciiLen < 30) {
        let num = getRandomInt(65, 91);
        let num2 = getRandomInt(97, 123);

        if (num >= 65 && num <= 90) {
            ascii += String.fromCharCode(num);
            asciiLen++;
        }

        if (num2 >= 97 && num2 <= 122) {
            ascii += String.fromCharCode(num2);
            asciiLen++;
        }
    }

    let base = "FEEDIES-";
    base += ascii;
    return base;
}

module.exports = {generateString};