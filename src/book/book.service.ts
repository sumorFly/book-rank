import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository, Like, Equal } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly book: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    const result = await this.book.find({
      where: {
        book_name: createBookDto.bookName,
      },
    });
    if (result.length)
      return { code: 200, status: false, message: '已有重复数据' };

    const data = new Book();
    data.book_name = createBookDto.bookName;
    data.read_count = createBookDto.readCount;
    data.author = createBookDto.author;
    data.creation_status = createBookDto.creationStatus;
    data.group_name = createBookDto.groupName;
    data.group = createBookDto.group;
    data.rank_date = createBookDto.rankDate;
    data.current_pos = createBookDto.currentPos;
    this.book.save(data);
    return {
      code: 200,
      status: true,
      message: '添加成功',
    };
  }

  async findAll(query: { bookName: string; page: number; pageSize: number }) {
    const data = await this.book.find({
      where: {
        book_name: Like(`%${query.bookName}%`),
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.book.count({
      where: {
        book_name: Like(`%${query.bookName}%`),
      },
    });
    return {
      data,
      total,
      code: 200,
      status: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.book.update(id, updateBookDto);

    return {
      code: 200,
      status: true,
      message: '修改成功',
    };
  }

  remove(id: number) {
    this.book.delete(id);
    return {
      code: 200,
      status: true,
      message: '删除成功',
    };
  }
  batchDelete(idList: number[]) {
    return [];
  }
}
