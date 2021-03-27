const Todo = require('../models/Todo');
const sendEmailTo = require('../utils/amazon');

module.exports = class TodoService {
    static async create({ todoItem, date, importance }) {
        await sendEmailTo(
            'dylan.whitej@gmail.com',
            `You have added a new todo to your list on ${date}. Todo: ${todoItem} Importance: ${importance}`
        );

        const todo = await Todo.insert({ todoItem, date, importance });

        return todo;
    }
    static async getTodos() {
        const todos = await Todo.getAll();

        await sendEmailTo(
            'dylan.whitej@gmail.com',
            `Here is your list of todos: ${todos}`
        );

        return todos;
    }
    static async getTodoById(id) {
        const todo = await Todo.getTodoById(id);

        return todo;
    }
    static async updateImportance({ id, importance }) {
        const todo = await Todo.updateTodoImportance({ id, importance });
        
        await sendEmailTo(
            'dylan.whitej@gmail.com',
            `Your todo: ${todo.todoItem}, has a new importance level of: ${todo.importance} `
            );
            
            return todo;
        }
        static async deleteTodo(id) {
            const todo = await Todo.deleteTodo(id);
    
            return todo;
        }
};
