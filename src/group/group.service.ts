import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Group } from './entities/group.entity';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly group: Repository<Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const result = await this.group.count({
      where: {
        group_name: createGroupDto.groupName,
        group: createGroupDto.groupName,
      },
    });
    if (result)
      return {
        status: true,
        code: 200,
        message: '分组名重复',
      };
    const data = new Group();
    data.group = createGroupDto.group;
    data.group_name = createGroupDto.groupName;
    data.platform = createGroupDto.platform;
    this.group.save(data);
    return {
      status: true,
      code: 200,
      message: '添加新分组成功',
    };
  }

  findAll(query: {
    group: string;
    groupName: string;
    platform: number;
    page: number;
    pageSize: number;
  }) {
    const data = this.group.find({
      where: {
        group: Like(`%${query.group}%`),
        platform: query.platform,
        group_name: Like(`%${query.groupName}`),
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    return {
      data: data,
      code: 200,
      status: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    this.group.update(id, updateGroupDto);
    return {
      code: 200,
      status: true,
      message: '修改成功',
    };
  }

  remove(id: number) {
    this.group.delete(id);
    return {
      code: 200,
      status: true,
      message: '删除成功',
    };
  }
}
