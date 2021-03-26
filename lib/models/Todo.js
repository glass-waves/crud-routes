const pool = require('../utils/pool')

module.exports = class Todo {
    id;
    todoItem;
    date;
    importance;

    constructor(row) {
        this.id = row.id;
        this.todoItem = row.todo_item;
        this.date = row.date;
        this.importance = row.importance
    }

    static async insert({ todoItem, date, importance }) {
        const { rows } = await pool.query(`
        INSERT INTO todos (todo_item, date, importance)
        VALUES ($1, $2, $3) RETURNING *`, [todoItem, date, importance]
        );

        return new Todo(rows[0]);
    }

}