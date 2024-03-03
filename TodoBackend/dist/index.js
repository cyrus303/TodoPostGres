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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/todos', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todoModel.findMany();
    response.send(todos);
}));
app.post('/todo', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, completed } = request.body;
    const todo = yield prisma.todoModel.create({
        data: {
            message,
            completed,
        },
    });
    response.send(todo);
}));
app.put('/todo/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const { message, completed } = request.body;
    const Updatedtodo = yield prisma.todoModel.update({
        where: {
            id,
        },
        data: {
            message,
            completed,
        },
    });
    response.send(Updatedtodo);
}));
app.delete('/todo/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const todo = yield prisma.todoModel.delete({
        where: { id },
    });
    response.send(todo);
}));
app.listen(PORT, () => {
    console.log('Sever running at ' + PORT);
});
