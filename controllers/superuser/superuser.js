const checkRequestBody = (...args) => {
    let arg;

    for (arg of args) {
        if (arg === null) return false;
    }

    return true;
};

module.exports = { checkRequestBody };
