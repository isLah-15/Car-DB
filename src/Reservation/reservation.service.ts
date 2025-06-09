import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { ReservationTable, TIReservation } from "../Drizzle/schema";



// create reservation service
export const createReservationService = async (reservation: TIReservation) => {
    const [inserted] = await db.insert(ReservationTable).values(reservation).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

//get all reservation service
export const getAllReservationService = async () => {
    const reservation = await db.select().from(ReservationTable);
    if (reservation.length === 0) {
        return "No reservation found";
    }
    return reservation;
};

//get reservation by id
export const getReservationById = async (reservationId: number) => {
    const reservation = await db.query.ReservationTable.findFirst({
        where: eq(ReservationTable.reservationId, reservationId)
    })
    return reservation;
};

//update reservation service
export const updateReservationService = async (id: number, reservation: TIReservation) => {
    await db.update(ReservationTable).set(reservation).where(eq(ReservationTable.reservationId, id)).returning();
    return "Reservation update successfully";

};
//delete reservation service
export const deleteReservationService = async (id: number) => {
    const deleted = await db.delete(ReservationTable).where(eq(ReservationTable.reservationId, id)).returning();
    if (deleted.length === 0) {
        return "Reservation not found";
    }
    return "Reservation deleted successfully";
}