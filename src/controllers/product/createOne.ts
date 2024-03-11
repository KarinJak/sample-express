import { Request, Response } from 'express'
import { Product, productRepository } from '../../models'
import { redisClient } from '../../services/redis'

export async function createOne(req: Request, res: Response): Promise<void> {
  let product: Product | null = null

  try {
    console.log('controller.product.createOne')
    product = await productRepository.createOne(req.body)

    res.status(201).json({ data: product })
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({
      error: error.message,
    })

    return
  }

  // cache product
  try {
    if (!product) {
      return
    }

    await Promise.all([
      // redisClient.set(`product:latest`, JSON.stringify(product)),
      redisClient.set(`product:${product.id}`, JSON.stringify(product))
    ])
  } catch (error) {
    console.log('cache product error:', error)
  }
}
