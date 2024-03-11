import { Request, Response } from 'express'
import { Product, productRepository } from '../../models'
import { redisClient } from '../../services/redis'

export type RequestGetById = Request<{ id: number }>

export async function getById(req: RequestGetById, res: Response): Promise<void> {
  let product: Product | null = null

  try {
    console.log(`controller.product.getById: request with ${req.params.id}`)

    const cachedProduct = await redisClient.get(`product:${req.params.id}`)

    if (cachedProduct) {
      res.status(200).json({ data: JSON.parse(cachedProduct) })

      return
    }

    product = await productRepository.getById(req.params.id)

    if (!product) {
      res.status(404).json({ data: null })

      return
    }

    res.status(200).json({ data: product })
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({
      error: error.message,
    })

    return
  }

  // cache to redis
  try {
    if (!product) {
      return
    }

    await redisClient.set(`product:${product.id}`, JSON.stringify(product))
  } catch (error) {
    console.log('redis error:', error)
  }
}
