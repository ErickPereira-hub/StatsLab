function validateNumArray(...vals) {

    vals.forEach(val => {
        if (isNaN(val)) {
            return false
        }
    });

    return true;
}

module.exports = { validateNumArray };