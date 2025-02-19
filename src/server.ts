import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: true,
});

//body, search params, route params
//  body = {name: "string", age: 20},
//  search params ou query string = http://localhost:3333?name=ismael&age=33,
//  route params = http://localhost:3333/user/33

app.post(
  "/subscriptions",
  {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      response: {
        201: z.object({
          name: z.string(),
          email: z.string(),
        }),
      },
    },
  },
  async (request, reply) => {
    const { name, email } = request.body;

    // criação da inscrição com o banco de dados

    return await reply.status(201).send({
      name,
      email,
    });
  }
);

app.listen({ port: 3333 }).then(() => {
  console.log("Server burning on port at 3333");
});
