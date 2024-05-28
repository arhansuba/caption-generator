import { HttpError } from 'wasp/server'

export const createCaption = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Caption.create({
    data: {
      content: args.content,
      category: args.category,
      userId: context.user.id
    }
  });
}

export const deleteCaption = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const caption = await context.entities.Caption.findUnique({
    where: { id: args.id }
  });
  if (!caption || caption.userId !== context.user.id) { throw new HttpError(400) };
  return context.entities.Caption.delete({
    where: { id: args.id }
  });
}