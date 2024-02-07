import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
    app.post('/polls', async (request, reply) => {
        const createPollsBody = z.object({
            title: z.string(),
            options: z.array(z.string()),
        });
    
        const { title, options } = createPollsBody.parse(request.body);
    
    
        const polls = await prisma.poll.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map(option => {
                           return { title: option }
                        }),
                    }
                }
            }
        })
        
        return reply.status(201).send({pollId: polls.id});
    })
    
}
