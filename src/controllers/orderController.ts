import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class orderController {
    create(){
        return async (request: Request, response: Response) => {
            const { total_value, client_name, client_city,client_address, client_phone, restaurantId, productsId } = request.body;
            const order = await prismaClient.order.create({
                data: {
                    total_value, 
                    client_name,
                    client_city,
                    client_address,
                    client_phone,
                    restaurantId,
                    products: {
                            connect: productsId.map(id => ({ id }))
                    }
                }
            })

            return response.json();
        }
    }

    list(){
        return async (request: Request, response: Response) => {
            const order = await prismaClient.order.findMany();

            return response.json(order);
        }
    }

    view(){
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const order = await prismaClient.order.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return response.json(order);
        }
    }

    update(){
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { total_value, client_name, client_city,client_address, client_phone, restaurantId } = request.body;

            const order = await prismaClient.order.update({
                where: {
                    id: Number(id)
                },
                data: {
                    total_value, 
                    client_name,
                    client_city,
                    client_address,
                    client_phone,
                    restaurantId
                }
            })

            return response.json();
        }
    }

    delete(){
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const order = await prismaClient.order.delete({
                where: {
                    id: Number(id)
                }
            })

            return response.json();
        }
    }
}