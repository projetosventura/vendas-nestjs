import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '../interfaces/product.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async create(product: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.repository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<ProductEntity[]> {
    return this.repository.find({
      where: { name },
    });
  }
}