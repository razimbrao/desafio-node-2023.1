import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class productController {

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description, price, category, restaurantId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            if (!restaurantExists) {
                return response.status(404).json({ error: "Restaurante não encontrado!" })
            }

            if (price < 0) {
                return response.status(406).json({ error: "Preço inválido!" })
            }

            const product = await prismaClient.product.create({
                data: {
                    name,
                    description,
                    price,
                    category,
                    restaurantId
                }
            })

            return response.json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async list(request: Request, response: Response): Promise<Response> {
        try {
            const product = await prismaClient.product.findMany(
                {
                    orderBy: {
                        id: 'asc'
                    }
                }
            );

            return response.json(product);
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async view(request: Request, response: Response): Promise<Response> {
        try {
        const { id } = request.params;

            const product = await prismaClient.product.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!product) {
                return response.status(404).json({ error: "Produto não encontrado!" })
            }

            return response.json(product);
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { name, description, price, category, restaurantId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            if (!restaurantExists) {
                return response.status(404).json({ error: "Restaurante ou produto não encontrado!" })
            }

            if (price < 0) {
                return response.status(406).json({ error: "Preço inválido!" })
            }

            const product = await prismaClient.product.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    description,
                    price,
                    category,
                    restaurantId
                }
            })

            if (!product) {
                return response.status(404).json({ error: "Restaurante ou produto não encontrado!" })
            }

            return response.json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const product = await prismaClient.product.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!product) {
                return response.status(404).json({ error: "Produto não encontrado!" })
            }

            return response.json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }
}