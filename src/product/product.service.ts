

import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../product/interfaces/product.entity';
import { ProductRepository } from '../product/repository/product.repository';
import { CreateProductDto } from './dtos/product.dto';



@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto,): Promise<ProductEntity> {
    const product = await this.productRepository.create(createProductDto);

    return product;
  }


  async getAllProduct(): Promise<ProductEntity[]> {

    return this.productRepository.findAll();
  }

   
  async findByName(name: string): Promise<ProductEntity[]> {
    return this.productRepository.findByName(name);
}
}