import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Try different possible locations for bundled.yaml
let specs = null;
const possiblePaths = [
  path.join(__dirname, '..', 'public', 'bundled.yaml'),
  path.join(__dirname, '..', '..', 'public', 'bundled.yaml'),
  '../public/bundled.yaml'
];

for (const yamlPath of possiblePaths) {
  try {
    if (fs.existsSync(yamlPath)) {
      specs = YAML.load(yamlPath);
      console.log(`✓ Loaded OpenAPI specs from: ${yamlPath}`);
      break;
    }
  } catch (error) {
    console.log(`Failed to load from ${yamlPath}:`, error.message);
  }
}

if (specs) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
} else {
  console.log('Could not load OpenAPI specs, providing basic API info');
  app.get('/api-docs', (req, res) => {
    res.json({
      message: 'Task API Documentation',
      version: '1.0.0',
      endpoints: {
        'GET /health': 'Health check',
        'GET /tasks': 'List all tasks (query: ?completed=true/false, ?limit=number)',
        'POST /tasks': 'Create a new task (body: {title: string, completed?: boolean})',
        'PUT /tasks/:id': 'Update a task',
        'DELETE /tasks/:id': 'Delete a task'
      }
    });
  });
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/tasks', taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

