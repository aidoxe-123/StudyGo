const errorHandler = (err, req, res, next) => {
    const output = "route: " + req.method + " " + req.originalUrl + "\n" +
        "input: " + JSON.stringify(req.body) + "\n";

    if (res.statusCode === 200) res.statusCode = 500;

    const response = {
        statusCode: res.statusCode,
        msg: err.message,
        moreDetail: output
    }

    console.log(output);
    res.status(500).send(response);
}

const pretestChecker = (req, res, next) => {
    const requiredFields = {
        // users.js
        'POST /api/v1/register': ['email', 'password', 'username'],
        'POST /api/v1/login': ['email', 'password'],
        'POST /api/v1/users': ['id'],
        // to-do-list.js
        'POST /api/v1/to-do-list': ['id', 'task'],
        'PUT /api/v1/to-do-list': ['userId', 'taskId', 'newTitle', 'newDate'],
        'POST /api/v1/to-do-list/all': ['id'],
        'DELETE /api/v1/to-do-list': ['userId', 'taskId'],
        // calendar.js
        'POST /api/v1/calendar/events': ['userId', 'month', 'year'],
        'POST /api/v1/calendar': ['userId', 'date', 'event'],
        'PUT /api/v1/calendar': ['userId', 'date', 'newEvent', 'eventId'],
        'DELETE /api/v1/calendar': ['userId', 'date', 'eventId']
    }

    const target = req.method + " " + req.path;
    if (requiredFields[target] === undefined) {
        throw new Error("Cannot use this method on this endpoint: " + target);
    }

    if (!requiredFields[target].every(key => Object.keys(req.body).includes(key))) {
        throw new Error("Missing required field(s)");
    }

    next();
}

const wrapper = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const success = (obj) => {
    obj.StatusCode = 200;
    obj.msg = "";
    return obj
}

module.exports = { errorHandler, pretestChecker, wrapper, success };
