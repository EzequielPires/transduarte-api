import { PartialType } from '@nestjs/swagger';
import { CreateTransparencyDto } from './create-transparency.dto';

export class UpdateTransparencyDto extends PartialType(CreateTransparencyDto) {}
