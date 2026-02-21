import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ProductEntity } from "./interfaces/product.entity";
import { CreateProductDto } from "./dtos/product.dto";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {

  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async getAllProduct(): Promise<ProductEntity[]> {
    return this.productService.getAllProduct();
  }

  @Get(':name')
    async findByName(@Param('name') name: string): Promise<ProductEntity[]> {
        return this.productService.findByName(name);
    }
}