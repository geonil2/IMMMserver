"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
require("express-async-errors");
const config_1 = require("./config");
const auth_1 = __importDefault(require("./router/auth"));
const database_js_1 = require("./db/database.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/', auth_1.default);
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, req, res, next) => {
    res.sendStatus(500);
    console.log(error);
});
database_js_1.sequelize.sync().then(() => {
    // const server = app.listen(config.host.port);
    console.log(config_1.config.host.port);
    app.listen(config_1.config.host.port);
    // initSocket(server);
});
//# sourceMappingURL=app.js.map