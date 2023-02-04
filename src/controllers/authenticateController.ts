import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";


interface IRequest {
    email: string;
    password: string;
}

export class authenticateController {
    async execute({ email, password }: IRequest, response: Response) {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: {
                email: email
            }
        })

        if (!restaurant) {
            return response.status(400).json({
                error: "Email ou senha inválidos!"
            })
        }

        const passwordMatch = await compare(password, restaurant.password);

        if (!passwordMatch) {

            return response.status(400).json({
                error: "Email ou senha inválidos!"
            })
        }


        const token = sign({}, "code",
            {
                subject: "restaurant.id",
                expiresIn: "60s",
            })
        return { token };
    }

    login() {
        return async (request: Request, response: Response) => {
            const { email, password } = request.body;

            try {
                const token = await this.execute({
                    email,
                    password
                }, response);

                return response.json(token);
            } catch (err) {
                return response.status(400).json({
                    error: err.message
                })
            }
        }
    }
}