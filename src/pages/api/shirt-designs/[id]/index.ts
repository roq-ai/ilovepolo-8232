import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { shirtDesignValidationSchema } from 'validationSchema/shirt-designs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shirt_design
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getShirtDesignById();
    case 'PUT':
      return updateShirtDesignById();
    case 'DELETE':
      return deleteShirtDesignById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShirtDesignById() {
    const data = await prisma.shirt_design.findFirst(convertQueryToPrismaUtil(req.query, 'shirt_design'));
    return res.status(200).json(data);
  }

  async function updateShirtDesignById() {
    await shirtDesignValidationSchema.validate(req.body);
    const data = await prisma.shirt_design.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteShirtDesignById() {
    const data = await prisma.shirt_design.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
