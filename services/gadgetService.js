const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateRandomName } = require('../utils/codenameGenerator');

exports.getGadgets = async (status) => {
  return prisma.gadget.findMany({
    where: status ? { status } : undefined
  });
};

exports.createGadget = async () => {
  const uniqueName = await generateRandomName();
  return prisma.gadget.create({
    data: {
      name: uniqueName
    }
  });
};

exports.getGadgetById = async (id) => {
    return prisma.gadget.findUnique({
        where: { 
            id 
        } 
    });
}


exports.updateGadget = async (id, data) => {
  if (data.name) {
    const existing = await prisma.gadget.findUnique({ where: { name: data.name } });
    if (existing && existing.id !== id) {
      const error = new Error('Name is already in use');
      error.statusCode = 409;
      throw error;
    }
  }
  return prisma.gadget.update({
    where: { id },
    data: { ...data }
  });
};

exports.decommissionGadget = async (id) => {
  return prisma.gadget.update({
    where: { id },
    data: {
      status: 'Decommissioned',
      decommissionedAt: new Date()
    }
  });
};

exports.destroyGadget = async (id) => {
  return prisma.gadget.update({
    where: { id },
    data: { 
      status: 'Destroyed',
      decommissionedAt: new Date()
    }
  });
};