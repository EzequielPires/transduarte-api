import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TransparencyService } from './transparency.service';
import { CreateTransparencyDto } from './dto/create-transparency.dto';
import { UpdateTransparencyDto } from './dto/update-transparency.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { editFileName } from 'src/helpers/EditNameFile';


@ApiTags('transparency')
@Controller('transparency')
export class TransparencyController {
  constructor(private readonly transparencyService: TransparencyService) { }

  @Post()
  create(@Body() createTransparencyDto: CreateTransparencyDto) {
    return this.transparencyService.create(createTransparencyDto);
  }

  @Get()
  findAll() {
    return this.transparencyService.findAll();
  }

  @Get('find-by-date')
  findByDate(@Query() query: { month: number, year: number }) {
    const { month, year } = query;
    return this.transparencyService.findByDate(month, year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transparencyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransparencyDto: UpdateTransparencyDto) {
    return this.transparencyService.update(id, updateTransparencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transparencyService.remove(+id);
  }

  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './storage/files',
      filename: editFileName
    })
  }))
  @Post('upload/:id')
  async upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    console.log(file)
    return this.transparencyService.update(id, { file: file.path });
  }
}
