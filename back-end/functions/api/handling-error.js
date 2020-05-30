module.exports = (route, body, err) => {
    const output = "route: " + route + "\n" +
        "input: " + JSON.stringify(body) + "\n" +
        "error: " + err.message;
    console.log(output);
    return output;
};