// App
import { Todo } from '../app/entities';
import { dataSource } from '../db';

export const schema = {
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
  type: 'object',
};

export async function main(args: { text: string }) {
  // Connect to the database.
  await dataSource.initialize();

  try {
    // Create a new task with the text given in the command line.
    const todo = new Todo();
    todo.text = args.text;

    // Save the task in the database and then display it in the console.
    console.log(await todo.save());
  } catch (error: any) {
    console.log(error.message);
  } finally {
    // Close the connection to the database.
    await dataSource.destroy();
  }
}
