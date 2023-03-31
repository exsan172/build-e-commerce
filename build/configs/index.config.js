"use strict";
/*
    config file, edit this file to write your config
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    env: process.env,
    response: (res, statusCode, success, message = "", data = [], errors = []) => {
        let dataJson = {
            statusCode,
            success,
            message,
            data,
            errors,
        };
        return res.status(statusCode).json(dataJson);
    },
    dbConnection: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config.env.DB_HOST, { dbName: config.env.DB_NAME });
            console.log("connection database success.");
        }
        catch (error) {
            console.log("connection database failed. ", error);
        }
    })
};
exports.default = config;
//# sourceMappingURL=index.config.js.map