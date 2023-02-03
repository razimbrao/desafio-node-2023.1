import { PrismaClient, Restaurants } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
prisma.$connect();

async function main() {
    await prisma.restaurants.deleteMany({});
    const amount = 50;
    const restaurants: Restaurants[] = [];

    for (let i = 0; i < amount; i++) {
        const restaurant: Restaurants = {
            id: i,
            email: faker.internet.email(),
            name: faker.company.name(),
            password: faker.internet.password(),
            category: faker.company.bs(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            phone: faker.phone.phoneNumber(),
        };
        restaurants.push(restaurant);
    }

    await prisma.restaurants.createMany({ data: restaurants });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });