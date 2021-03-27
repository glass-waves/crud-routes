const { Router } = require('express');
const TodoService = require('../services/TodoService');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const todo = await TodoService.create(req.body);
            res.send(todo);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const todos = await TodoService.getTodos();
            res.send(todos);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const todos = await TodoService.getTodoById(req.params.id);
            res.send(todos);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const updatedTodo = await TodoService.updateImportance({ id: req.params.id, importance: req.body.importance });

            res.send(updatedTodo)
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const deletedTodo = await TodoService.deleteTodo(req.params.id);
            res.send(deletedTodo);
        } catch (error) {
            next(error)
        }
    })