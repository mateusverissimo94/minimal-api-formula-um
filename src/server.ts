import fastify from "fastify";
import cors from "@fastify/cors";

// Criando sservidor Fastify com logger habilitado
const server = fastify({ logger: true });

// Registrando CORS e permitindo solicitações de http://localhost:3333
server.register(cors, {
  origin: "http://localhost:3333",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Parametros de rota para os verbos HTTP
interface IdParams {
  id: string;
}

interface DriverBody {
  name: string;
  team: string;
}

interface TeamBody {
  name: string;
  base: string;
}

// Iniciando o servidor na porta 3333
server.listen({ port: 3333 }, () => {
  console.log("Server is running on port 3333");
});

// Objetos de times e corredores da fórmula 1
let teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
];

let drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
];

// Métodos HTTP GET para retornar todos os times e corredores
server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

// Métodos HTTP GET para retornar um time ou corredor específico pelo ID
server.get<{ Params: IdParams }>("/teams/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const team = teams.find((t) => t.id === id);
  if (!team) {
    response.type("application/json").code(404);
    return { error: "Team not found" };
  } else {
    response.type("application/json").code(200);
    return { team };
  }
});

server.get<{ Params: IdParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);
  if (!driver) {
    response.type("application/json").code(404);
    return { error: "Driver not found" };
  } else {
    response.type("application/json").code(200);
    return { driver };
  }
});

// Métodos HTTP POST para cadastrar um novo time ou corredor
server.post<{ Body: TeamBody }>("/teams", async (request, response) => {
  const { name, base } = request.body;

  const nextId = teams.length > 0 ? Math.max(...teams.map((t) => t.id)) + 1 : 1;

  const newTeam = { id: nextId, name, base };
  teams.push(newTeam);

  response.type("application/json").code(201);
  return { team: newTeam };
});

server.post<{ Body: DriverBody }>("/drivers", async (request, response) => {
  const { name, team } = request.body;

  const nextId =
    drivers.length > 0 ? Math.max(...drivers.map((d) => d.id)) + 1 : 1;

  const newDriver = { id: nextId, name, team };
  drivers.push(newDriver);

  response.type("application/json").code(201);
  return { driver: newDriver };
});

// Métodos HTTP PUT para atualizar um time ou corredor existente
server.put<{ Params: IdParams; Body: TeamBody }>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, base } = request.body;

    const teamIndex = teams.findIndex((t) => t.id === id);

    if (teamIndex === -1) {
      response.type("application/json").code(404);
      return { error: "Team not found" };
    }

    teams[teamIndex] = { id, name, base };

    response.type("application/json").code(200);
    return { team: teams[teamIndex] };
  },
);

server.put<{ Params: IdParams; Body: DriverBody }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, team } = request.body;

    const driverIndex = drivers.findIndex((d) => d.id === id);

    if (driverIndex === -1) {
      response.type("application/json").code(404);
      return { error: "Driver not found" };
    }

    drivers[driverIndex] = { id, name, team };

    response.type("application/json").code(200);
    return { driver: drivers[driverIndex] };
  },
);

// Métodos HTTP DELETE para remover um time ou corredor existente
server.delete<{ Params: IdParams }>("/teams/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const teamExists = teams.some((t) => t.id === id);

  if (!teamExists) {
    response.type("application/json").code(404);
    return { error: "Team not found" };
  }

  teams = teams.filter((t) => t.id !== id);

  response.type("application/json").code(200);
  return { message: "Team deleted successfully" };
});

server.delete<{ Params: IdParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driverExists = drivers.some((d) => d.id === id);

    if (!driverExists) {
      response.type("application/json").code(404);
      return { error: "Driver not found" };
    }

    drivers = drivers.filter((d) => d.id !== id);

    response.type("application/json").code(200);
    return { message: "Driver deleted successfully" };
  },
);
