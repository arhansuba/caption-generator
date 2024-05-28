import { HttpError } from 'wasp/server'

export const getCaption = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const caption = await context.entities.Caption.findUnique({
    where: { id: args.id },
    select: { content: true, category: true, userId: true }
  });

  if (!caption) { throw new HttpError(404, 'Caption with id ' + args.id + ' not found') }

  if (caption.userId !== context.user.id) { throw new HttpError(400, 'Caption does not belong to the user') }

  return caption;
}

export const getCaptionsByCategory = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Caption.findMany({
    where: {
      category: args.category,
      userId: context.user.id
    }
  });
}