const Todo = require('../models/Todo');
const sendEmailTo = require('../utils/amazon');

module.exports = class TodoService {
    static async create({ todoItem, date, importance }) {
        await sendEmailTo(
            'dylan.whitej@gmail.com',
            `You have added a new todo to your list on ${date}. Todo: ${todoItem} Importance: ${importance}`
        );

        const todo = await Todo.insert({ todoItem, date, importance })

        return todo;
    }

}