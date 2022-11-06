import {
	Context,
	Delete,
	Get,
	HttpResponseCreated,
	HttpResponseNoContent,
	HttpResponseNotFound,
	HttpResponseOK,
	Post,
	ValidateBody,
	ValidatePathParam,
} from '@foal/core';

import {Todo} from '../entities';

export class ApiController {
	@Get('/todos')
	async getTodos() {
		const todos = await Todo.find();
		return new HttpResponseOK(todos);
	}

	@Post('/todos')
	@ValidateBody({
		// Every additional properties that are not defined in the "properties"
		// object should be removed.
		additionalProperties: false,
		properties: {
			// The "text" property of ctx.request.body should be a string if it exists.
			text: {type: 'string'},
		},
		// The property "text" is required.
		required: ['text'],
		// The body request should be an object once parsed by the framework.
		type: 'object',
	})
	async postTodo(ctx: Context) {
		const todo = new Todo();
		todo.text = ctx.request.body.text;

		await todo.save();

		return new HttpResponseCreated(todo);
	}

	@Delete('/todos/:id')
	// The id should be a number. If it is not, the hook returns a "400 - Bad Request" error.
	@ValidatePathParam('id', {type: 'number'})
	async deleteTodo(ctx: Context) {
		const todo = await Todo.findOneBy({id: ctx.request.params.id});
		if (!todo) {
			return new HttpResponseNotFound();
		}

		await todo.remove();
		return new HttpResponseNoContent();
	}
}
