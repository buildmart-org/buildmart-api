import { Prisma } from '@prisma/client';

export const FILE_DETAILS_SELECT = Prisma.validator<Prisma.FilesSelect>()({
    id: true,
    url: true,
    targetId: true,
    targetType: true,
    createdAt: true,
});

export type FileSelectType = Prisma.FilesGetPayload<{
    select: typeof FILE_DETAILS_SELECT;
}>;
