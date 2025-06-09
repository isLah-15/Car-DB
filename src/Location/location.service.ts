import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { LocationTable, TILocation } from "../Drizzle/schema";

// create location service
export const createLocationService = async (location: TILocation) => {
    const [inserted] = await db.insert(LocationTable).values(location).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

//get all location service
export const getAllLocationService = async () => {
    const location = await db.select().from(LocationTable);
    if (location.length === 0) {
        return "No location found";
    }
    return location;
};

//get location by id
export const getLocationById = async (locationId: number) => {
    const location = await db.query.LocationTable.findFirst({
        where: eq(LocationTable.locationId, locationId)
    })
    return location;
};

//update location service
export const updateLocationService = async (id: number, location: TILocation) => {
    await db.update(LocationTable).set(location).where(eq(LocationTable.locationId, id)).returning();
    return "Location update successfully";
};

//delete location service
export const deleteLocationService = async (id: number) => {
    const deleted = await db.delete(LocationTable).where(eq(LocationTable.locationId, id)).returning();
    if (deleted.length === 0) {
        return "Location not found";
    }
    return "Location deleted successfully";
};


