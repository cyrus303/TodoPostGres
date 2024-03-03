import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/todos', async (request, response) => {
  const todos = await prisma.todoModel.findMany();
  response.send(todos);
});

app.post('/todo', async (request, response) => {
  const {message, completed} = request.body;
  const todo = await prisma.todoModel.create({
    data: {
      message,
      completed,
    },
  });
  response.send(todo);
});

app.put('/todo/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const {message, completed} = request.body;

  const Updatedtodo = await prisma.todoModel.update({
    where: {
      id,
    },
    data: {
      message,
      completed,
    },
  });
  response.send(Updatedtodo);
});

app.delete('/todo/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const todo = await prisma.todoModel.delete({
    where: {id},
  });
  response.send(todo);
});

app.listen(PORT, () => {
  console.log('Sever running at ' + PORT);
});
