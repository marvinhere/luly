import express from 'express';
import appRouter from './router';

const app = express();
const port = 3000; 

app.use(appRouter)

app.listen(port, () => {
  console.log(`El servidor está en ejecución en http://localhost:${port}`);
});
