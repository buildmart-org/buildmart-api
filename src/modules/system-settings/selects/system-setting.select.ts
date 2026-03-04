import { Prisma } from '@prisma/client';

export const SYSTEM_SETTING_SELECT = Prisma.validator<Prisma.SystemSettingsSelect>()({
    id: true,
    key: true,
    title: true,
    value: true,
});

export type SystemSettingSelectType = Prisma.SystemSettingsGetPayload<{
    select: typeof SYSTEM_SETTING_SELECT;
}>;
