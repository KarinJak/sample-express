import { Request, Response } from 'express'
import { Product, productRepository } from '../../models'
import { redisClient } from '../../services/redis'

export async function getLatest(_: Request, res: Response): Promise<void> {
  let latestProduct: Product | null = null

  try {
    console.log('controller.product.getLatest')
    const cachedProduct = await redisClient.get('product:latest')

    if (cachedProduct) {
      res.status(200).json({ data: JSON.parse(cachedProduct) })

      return
    }

    latestProduct = await productRepository.getLatestProduct()

    if (!latestProduct) {
      res.status(404).json({ data: null })

      return
    }

    res.status(200).json({ data: latestProduct })
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({
      error: error.message,
    })

    return
  }

  // cache to redis
  try {
    if (!latestProduct) {
      return
    }

    await redisClient.set(`product:${latestProduct.id}`, JSON.stringify(latestProduct))
  } catch (error) {
    console.log('redis error:', error)
  }
}
