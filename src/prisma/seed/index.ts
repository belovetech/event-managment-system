import { PrismaClient } from '@prisma/client';
import { ISeat } from '@seats/seatInterface';
import SeatRepository from '@seats/seatRepository';
import SeatService from '@seats/seatService';
import { generateSeatNumber } from '@utils';

async function main() {
  const seatNumbers = generateSeatNumber(10);
  const seatService = new SeatService(new SeatRepository());
  let seatNumberData: ISeat[] = [];
  seatNumbers.forEach((seatNumber: string) =>
    seatNumberData.push({
      number: seatNumber,
    })
  );
  await seatService.createSeats(seatNumberData);
}

main()
  .then(async () => {
    console.log('Seeding is done');
    process.exit(0);
  })
  .catch((e) => {
    console.error("Couldn't seed the database", e);
    process.exit(1);
  })
  .finally(async () => {
    await new PrismaClient().$disconnect();
  });
