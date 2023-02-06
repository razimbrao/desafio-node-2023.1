import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class orderController {

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { total_value, client_name, client_city, client_address, client_phone, restaurantId, productsId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            for (const productId of productsId) {
                const productExists = await prismaClient.product.count({
                    where: {
                        id: productId
                    }
                });

                if (!productExists || !restaurantExists) {
                    return response.status(404).json({ error: "Restaurante ou produto não encontrado!" })
                }
            }

            if (total_value < 0) {
                return response.status(406).json({ error: "Preço total inválido!" })
            }

            await prismaClient.order.create({
                data: {
                    total_value,
                    client_name,
                    client_city,
                    client_address,
                    client_phone,
                    restaurantId,
                    products: {
                        connect: productsId.map((id: any) => ({ id }))
                    }
                }
            })

            return response.status(201).json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async list(request: Request, response: Response): Promise<Response> {
        try {
            const order = await prismaClient.order.findMany(
                {
                    orderBy: {
                        id: 'asc'
                    }
                }
            );

            return response.json(order);
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async view(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const order = await prismaClient.order.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!order) {
                return response.status(404).json({ error: "Pedido não encontrado!" })
            }

            return response.json(order);
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {

            const { id } = request.params;
            const { total_value, client_name, client_city, client_address, client_phone, restaurantId, productsId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            if (!restaurantExists) {
                return response.status(404).json({ error: "Restaurante ou produto não encontrado!" })
            }

            for (const productId of productsId) {
                const productExists = await prismaClient.product.count({
                    where: {
                        id: productId
                    }
                });
                if (!productExists) {
                    return response.status(404).json({ error: 'Restaurante ou produto não encontrado!' });
                }
            }

            if (total_value < 0) {
                return response.status(406).json({ error: "Preço total inválido!" })
            }


            await prismaClient.order.update({
                where: {
                    id: Number(id)
                },
                data: {
                    total_value,
                    client_name,
                    client_city,
                    client_address,
                    client_phone,
                    restaurantId,
                    products: {
                        connect: productsId.map((id: any) => ({ id }))
                    }
                }
            })

            return response.json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const order = await prismaClient.order.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!order) {
                return response.status(404).json({ error: "Pedido não encontrado!" })
            }

            return response.json();
        }
        catch (err) {
            return response.status(500).json({ error: err.message })
        }
    }
}