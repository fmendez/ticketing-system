"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTickets = exports.getProvider = exports.getConnection = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@project-serum/anchor");
const opts = {
    preflightCommitment: "processed",
};
const getConnection = () => {
    const network = "http://127.0.0.1:8899";
    const connection = new web3_js_1.Connection(network, opts.preflightCommitment);
    return connection;
};
exports.getConnection = getConnection;
const getProvider = (wallet) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new anchor_1.Provider((0, exports.getConnection)(), wallet, opts);
    return provider;
});
exports.getProvider = getProvider;
const generateTickets = (noTickets) => {
    let events = [];
    let min = Math.ceil(100000);
    let max = Math.floor(900000);
    for (let index = 0; index < noTickets; index++) {
        const eventId = Math.floor(Math.random() * (max - min) + min);
        events.push(eventId);
    }
    return events;
};
exports.generateTickets = generateTickets;
