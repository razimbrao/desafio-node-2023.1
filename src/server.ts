import express from 'express';
import { router } from './routes';
import SwaggerUi  from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
app.use(router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});