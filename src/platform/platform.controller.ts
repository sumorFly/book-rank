import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  create(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformService.create(createPlatformDto);
  }

  @Get()
  findAll(@Query() query: { platformName: string }) {
    return this.platformService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePlatformDto: UpdatePlatformDto,
  // ) {
  //   return this.platformService.update(+id, updatePlatformDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformService.remove(+id);
  }
}
