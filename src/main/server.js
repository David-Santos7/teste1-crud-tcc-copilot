require("dotenv").config();
const { createCompositionRoot } = require("./compositionRoot");
const { createApp } = require("./app");

const root = createCompositionRoot();
const app = createApp({ controller: root.controller });
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
