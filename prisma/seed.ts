import { PrismaClient, Restaurant } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
prisma.$connect();

async function main() {
    await prisma.restaurant.deleteMany({});
    const amount = 50;
    const restaurants: Restaurant[] = [];

    for (let i = 0; i < amount; i++) {
        const restaurant: Restaurant = {
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

    await prisma.restaurant.createMany({ data: restaurants });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });