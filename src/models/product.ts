import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { database } from '../database'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date
}

class ProductRepository {
  async createOne(body: Omit<Product, 'id'>): Promise<Product> {
    const ProductRepository = database.getRepository(Product)

    return ProductRepository.save(body)
  }

  async getById(id: number): Promise<Product | null> {
    const ProductRepository = database.getRepository(Product)

    return ProductRepository.findOneBy({ id })
  }

  async getLatestProduct(): Promise<Product | null> {
    const ProductRepository = database.getRepository(Product)
    const latestProduct = await ProductRepository.find({
      take: 1,
      order: { createdAt: "DESC" },
    })

    return latestProduct[0] || null
  }
}

export const productRepository = new ProductRepository()
