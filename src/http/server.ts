import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const app = fastify();

const prisma = new PrismaClient()

app.post('/polls', async (request, reply) => {
    const createPollsBody = z.object({
        title: z.string(),
    });

    const { title } = createPollsBody.parse(request.body);


    const polls = await prisma.polls.create({
        data: {
            title
        }
    })
    
    return reply.status(201).send({pollId: polls.id});
})

app.listen({ port: 3333 }).then(() => {
    console.log(`Server listening on port 3333`);
})
