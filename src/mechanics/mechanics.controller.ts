// mechanic.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { MechanicService } from './mechanics.service';

@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post()
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicService.create(createMechanicDto);
  }

  @Get()
  findAll() {
    return this.mechanicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mechanicService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMechanicDto: UpdateMechanicDto) {
    return this.mechanicService.update(+id, updateMechanicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mechanicService.remove(+id);
  }
}
