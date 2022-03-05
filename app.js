import express from 'express';
import path from 'path';
import { handler } from './lib/handler.js';

const app = express();
const PORT = 3001;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.urlencoded({ extended: true }));

app.get(`/`, handler)

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
})