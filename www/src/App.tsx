import { SectionBody, SectionHeaderTitle, SuperHeader } from "./Head";

function App() {
  return (
    <main className="my-10 mx-auto max-w-[1120px]">
      <SuperHeader />

      <section>
        <SectionHeaderTitle>
          Installation (cli not published🤡)
        </SectionHeaderTitle>
        <SectionBody>
          Install controller core using your package manager of your choice.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">
            npm install @leenard/core
          </pre>
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>Initialize</SectionHeaderTitle>
        <SectionBody>
          Setup an express server and initialize basic scaffold.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{init}</pre>
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>Usage</SectionHeaderTitle>
        <SectionBody>
          Example of a TODO list application using the ControllerFlow class.
          <br />
          <br />
          Create an instance of a ControllerFlow class.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{usage}</pre>
          <br />
          Create todo:
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{create}</pre>
          <br />
          Update todo:
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{update}</pre>
          <br />
          Delete todo:
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{deleteT}</pre>
          <br />
          Routes:
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">{route}</pre>
          <br />
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>Explanation</SectionHeaderTitle>
        <SectionBody>
          This example demonstrates how to use our Workflow class with a
          realistic TODO list application.
          <br />
          <br />
          Here's what each workflow does:
          <br />
          <br />
          <ul>
            <li>
              - createTodoWorkflow: Validates the input, creates a new todo in
              the database, and returns the created todo.
            </li>
            <li>
              - updateTodoWorkflow: Validates the update data, updates the todo
              in the database, and returns the updated todo.
            </li>
            <li>
              - deleteTodoWorkflow: Validates the delete request, deletes the
              todo from the database, and returns a success message.
            </li>
          </ul>
          <br />
          <br />
          <br />
          Each workflow is broken down into steps, allowing for better error
          handling and the potential for retries or more complex operations in
          each step. If the workflow fails at any step, it will automatically be
          retried after a delay, and keep the results of the successful steps.
          If it fails too many times, it will be marked as failed and return an
          error.
        </SectionBody>
      </section>

      <footer>
        <br />
        <br />
        <br />
        <p className="my-10 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Leenard Zarate. Check on{" "}
          <a
            href="https://github.com/leenrd/shein-worker-gg"
            target="_blank"
            className="underline text-blue-600"
          >
            github
          </a>{" "}
        </p>
      </footer>
    </main>
  );
}

export default App;

const init = `import express from 'express';
import mongoose from 'mongoose';
import { ControllerFlow } from '@leenard/core';

const app = express();
app.use(express.json());

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(mongoUri);

// Define Todo model
const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const Todo = mongoose.model('Todo', TodoSchema);`;

const usage = `const workflow = new ControllerFlow(baseUrl);`;

const create = `// Create Todo controller
const createTodoCn = workflow.createController((step) => {
  create
    .step(async (data, req) => {
      console.log("Validating todo data");
      const { title, description } = data;
      if (!title) throw new Error("Title is required");
      return { title, description };
    })
    .step(async (data) => {
      console.log("Creating todo in database");
      const todo = new Todo({
        ...data,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await todo.save();
      return todo;
    })
    .finally(async (todo) => {
      console.log("Todo created successfully:", todo);
      return todo;
    });
});`;

const update = `// Update Todo controller
const updateTodoCn = workflow.createController((step) => {
  create
    .step(async (data, req) => {
      console.log("Validating update data");
      const { id, title, description, completed } = data;
      if (!id) throw new Error("Todo ID is required");
      return { id, title, description, completed };
    })
    .step(async (data) => {
      console.log("Updating todo in database");
      const todo = await Todo.findByIdAndUpdate(
        data.id,
        {
          ...data,
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!todo) throw new Error("Todo not found");
      return todo;
    })
    .finally(async (todo) => {
      console.log("Todo updated successfully:", todo);
      return todo;
    });
});`;

const deleteT = `// Delete Todo controller
const deleteTodoCn = workflow.createController((step) => {
  create
    .step(async (data, req) => {
      console.log("Validating delete request");
      const { id } = data;
      if (!id) throw new Error("Todo ID is required");
      return { id };
    })
    .step(async (data) => {
      console.log("Deleting todo from database");
      const todo = await Todo.findByIdAndDelete(data.id);
      if (!todo) throw new Error("Todo not found");
      return todo;
    })
    .finally(async (todo) => {
      console.log("Todo deleted successfully:", todo);
      return { message: "Todo deleted successfully", todo };
    });
});`;

const route = `// Set up routes
app.post('/todos', createTodoWorkCn.POST);
app.put('/todos/:id', updateTodoWorkCn.PUT);
app.delete('/todos/:id', deleteTodoWorkCn.DELETE);

// Get all todos (without using workflow for simplicity)
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`;
