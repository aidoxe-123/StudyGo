module.exports = (data, needed) => {
    if (!needed.every(key => Object.keys(data).includes(key))) {
        throw new Error("Missing required field(s)");
    }
}