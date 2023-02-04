import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class restaurantController {

  create() {
    return async (request: Request, response: Response) => {
      const { email, name, password, category, city, address, phone } = request.body;

      const restaurant = await prismaClient.restaurant.create({
        data: {
          email,
          name,
          password,
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
      const restaurant = await prismaClient.restaurant.findMany();

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

      return response.json(restaurant);
    }
  }

  update() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { email, name, password, category, city, address, phone } = request.body;

      const restaurant = await prismaClient.restaurant.update({
        where: {
          id: Number(id)
        },
        data: {
          email,
          name,
          password,
          category,
          city,
          address,
          phone
        }
      })

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

      return response.json();
    }
  }

}