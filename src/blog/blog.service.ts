import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './schemas/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly blogModel: Model<BlogPost>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogModel.create(createBlogDto);
  }

  findAll() {
    return this.blogModel.find();
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException();
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('No such blog');
    return this.blogModel.updateOne(
      { _id: id },
      { $set: { ...updateBlogDto } },
    );
  }

  async remove(id: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('No such blog');
    return this.blogModel.deleteOne({ _id: id });
  }
}
