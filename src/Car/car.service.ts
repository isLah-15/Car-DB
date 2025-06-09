import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { BookingTable, CarTable, InsuranceTable, MaintenanceTable, ReservationTable, TICar } from "../Drizzle/schema";


// create car service
export const createCarService = async (car: TICar) => {
    const [inserted] = await db.insert(CarTable).values(car).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

//get all car service with reservsations, bookings, maintenance, and insurance details
export const getAllCarService = async () => {
    const car = await db.select().from(CarTable)
    .leftJoin(ReservationTable as any, eq(CarTable.carId, ReservationTable.carId))
    .leftJoin(BookingTable as any, eq(CarTable.carId, BookingTable.carId))
    .leftJoin(MaintenanceTable as any, eq(CarTable.carId, MaintenanceTable.carId))
    .leftJoin(InsuranceTable as any, eq(CarTable.carId, InsuranceTable.carId));
    if (car.length === 0) {
        return "No cars found";
    }
    return car;
};

//get car by id with reservsations, bookings, maintenance, and insurance details
export const getCarById = async (carId: number) => {
    const car = await db.select().from(CarTable)
    .leftJoin(ReservationTable as any, eq(CarTable.carId, ReservationTable.carId))
    .leftJoin(BookingTable as any, eq(CarTable.carId, BookingTable.carId))
    .leftJoin(MaintenanceTable as any, eq(CarTable.carId, MaintenanceTable.carId))
    .leftJoin(InsuranceTable as any, eq(CarTable.carId, InsuranceTable.carId))
    .where(eq(CarTable.carId, carId));
    return car;
};

//update car service
export const updateCarService = async (id: number, car: TICar) => {
    await db.update(CarTable).set(car).where(eq(CarTable.carId, id)).returning();
    return "Car update successfully";

};

//delete car service
export const deleteCarService = async (id: number) => {
    const deleted = await db.delete(CarTable).where(eq(CarTable.carId, id)).returning();
    if (deleted.length === 0) {
        return "Car not found";
    }
    return "Car deleted successfully";
};

