import { SystemSettingSelectType } from '@modules/system-settings/selects';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SystemSettingDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    key!: string;

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiProperty()
    @Expose()
    value!: string;

    constructor(partial: Partial<SystemSettingDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: SystemSettingSelectType): SystemSettingDto {
        return new SystemSettingDto({
            id: entity.id,
            key: entity.key,
            title: entity.title,
            value: entity.value,
        });
    }
}
