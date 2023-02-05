import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { hash } from "bcryptjs";

export class restaurantController {

  create() {
    return async (request: Request, response: Response) => {
      const { email, name, password, category, city, address, phone } = request.body;

      const emailExists = await prismaClient.restaurant.findUnique(
        {
          where: {
            email: email
          }
        }
      )

      if (emailExists) {
        return response.status(403).json({
          error: "Email já cadastrado!"
        })
      }

      const hashedPassword = await hash(password, 8);

      const restaurant = await prismaClient.restaurant.create({
        data: {
          email,
          name,
          password: hashedPassword,
          category,
          city,
          address,
          phone
        }
      })

      return response.json();
    }
  }

  list() {
    return async (request: Request, response: Response) => {
      const restaurant = await prismaClient.restaurant.findMany( 
        {
          orderBy: {
            id: 'asc'
          }
        }
      );

      return response.json(restaurant);
    }
  }

  view() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;



      const restaurant = await prismaClient.restaurant.findUnique({
        where: {
          id: Number(id)
        }
      })
      if (!restaurant) {
        return response.status(404).json({
          error: "Restaurante não encontrado!"
        })
      }

      return response.json(restaurant);
    }
  }

  update() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { email, name, password, category, city, address, phone } = request.body;

      const hashedPassword = await hash(password, 8);

      const restaurant = await prismaClient.restaurant.update({
        where: {
          id: Number(id)
        },
        data: {
          email,
          name,
          password: hashedPassword,
          category,
          city,
          address,
          phone
        }
      })

      if (!restaurant) {
        return response.status(404).json({
          error: "Restaurante não encontrado!"
        })
      }
      return response.json();
    }
  }

  delete() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      const restaurant = await prismaClient.restaurant.delete({
        where: {
          id: Number(id)
        }
      })

      if (!restaurant) {
        return response.status(404).json({
          error: "Restaurante não encontrado!"
        })
      }

      return response.json();
    }
  }

}