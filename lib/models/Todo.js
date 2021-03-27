const pool = require('../utils/pool')

module.exports = class Todo {
    id;
    todoItem;
    date;
    importance;

    constructor(row) {
        const dateObj = new Date(Number(row.date));
        this.id = row.id;
        this.todoItem = row.todo_item;
        this.date = dateObj.toLocaleString();
        this.importance = row.importance
    }

    static async insert({ todoItem, date, importance }) {
        const dateInMS = new Date(date).getTime();

        const { rows } = await pool.query(`
        INSERT INTO todos (todo_item, date, importance)
        VALUES ($1, $2, $3) RETURNING *`, [todoItem, dateInMS, importance]
        );

        return new Todo(rows[0]);
    }
    static async getAll() {

        const { rows } = await pool.query(`
        SELECT * FROM todos`);

        return rows.map(row => new Todo(row));
    }
    static async getTodoById(id) {

        const { rows } = await pool.query(`
        SELECT * FROM todos
        WHERE id = $1`, [id]);

        return new Todo(rows[0]);
    }
    static async updateTodoImportance({ id, importance }) {
        
        const { rows } = await pool.query(`
        UPDATE todos
        SET importance = $1
        WHERE id = $2
        RETURNING *`, [importance, id]);
        
        return new Todo(rows[0]);
    }
    
    static async deleteTodo(id) {
    
        const { rows } = await pool.query(`
        DELETE FROM todos
        WHERE id = $1`, [id]);
    
        return new Todo(rows[0]);
    }
}