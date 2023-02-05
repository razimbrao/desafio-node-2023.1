import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class productController {

    create() {
        return async (request: Request, response: Response) => {
            const { name, description, price, category, restaurantId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            if (!restaurantExists) {
                return response.status(404).json({
                    error: "Restaurante não encontrado!"
                })
            }

            if (price < 0) {
                return response.status(406).json({
                    error: "Preço inválido!"
                })
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
    }

    list() {
        return async (request: Request, response: Response) => {
            const product = await (await prismaClient.product.findMany(
                {
                    orderBy: {
                        id: 'asc'
                    }
                }
            ));
           
            return response.json(product);
        }
    }

    view() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const product = await prismaClient.product.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!product) {
                return response.status(404).json({
                    error: "Produto não encontrado!"
                })
            }

            return response.json(product);
        }
    }

    update() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { name, description, price, category, restaurantId } = request.body;

            const restaurantExists = await prismaClient.restaurant.findUnique({
                where: {
                    id: Number(restaurantId)
                }
            })

            if (!restaurantExists) {
                return response.status(404).json({
                    error: "Restaurante ou produto não encontrado!"
                })
            }

            if (price < 0) {
                return response.status(406).json({
                    error: "Preço inválido!"
                })
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
                return response.status(404).json({
                    error: "Restaurante ou produto não encontrado!"
                })
            }

            return response.json();
        }
    }

    delete() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const product = await prismaClient.product.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!product) {
                return response.status(404).json({
                    error: "Produto não encontrado!"
                })
            }

            return response.json();
        }
    }
}