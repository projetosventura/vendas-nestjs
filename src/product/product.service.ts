

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../product/interfaces/product.entity';
import { ProductRepository } from '../product/repository/product.repository';
import { CreateProductDto } from './dtos/product.dto';


@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.create(createProductDto);

      return product;
    } catch (error) {
      // exemplo: erro de constraint unique no postgres
      if (error.code === '23505') {
        throw new ConflictException('Produto já cadastrado');
      }

      throw new InternalServerErrorException(
        'Erro ao criar produto',
      );
    }
  }

  async getAllProduct(): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.findAll();

      return products;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar produtos',
      );
    }
  }

  async findByName(name: string): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.findByName(name);

      if (!products || products.length === 0) {
        throw new NotFoundException(
          'Produto não encontrado',
        );
      }

      return products;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Erro ao buscar produto por nome',
          );
    }
  }
}