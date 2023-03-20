import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Platform } from './entities/platform.entity';
@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform) private readonly platform: Repository<Platform>,
  ) {}
  async create(createPlatformDto: CreatePlatformDto) {
    const result = await this.platform.count({
      where: {
        platform_name: createPlatformDto.platformName,
      },
    });
    if (result)
      return {
        status: true,
        code: 200,
        message: '数据重复',
      };
    const data = new Platform();
    data.platform_name = createPlatformDto.platformName;
    this.platform.save(data);
    return {
      status: true,
      code: 200,
      message: '添加成功',
    };
  }

  async findAll(query: { platformName: string }) {
    const data = await this.platform.find({
      where: {
        platform_name: Like(`%${query.platformName}`),
      },
    });
    return {
      data,
      total: data.length,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} platform`;
  }

  // update(id: number, updatePlatformDto: UpdatePlatformDto) {
  //   this.platform.update(id, updatePlatformDto);
  //   return {
  //     message: '更新成功',
  //   };
  // }

  remove(id: number) {
    this.platform.delete(id);
    return {
      message: '删除成功',
    };
  }
}
