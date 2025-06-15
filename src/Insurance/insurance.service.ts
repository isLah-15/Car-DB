import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { CarTable, InsuranceTable, TIInsurance } from "../Drizzle/schema";

// create a new insurance service
export const createInsuranceService = async (insurance: TIInsurance) => {
    const [inserted] = await db.insert(InsuranceTable).values(insurance).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

// get all insurance service with car details
export const getAllInsuranceService = async () => {
  const insurances = await db.query.InsuranceTable.findMany({
    with: {
      car: true,
    },
  });

  if (insurances.length === 0) {
    return "No insurance found";
  }

  return insurances;
};

// get insurance by id with car details
export const getInsuranceById = async (insuranceId: number) => {
  const insurance = await db.query.InsuranceTable.findFirst({
    with: {
      car: true,
    },
  });

  if (!insurance) {
    return "Insurance not found";
  }

  return insurance;
};

//update insurance service
export const updateInsuranceService = async (id: number, insurance: TIInsurance) => {
    await db.update(InsuranceTable).set(insurance).where(eq(InsuranceTable.insuranceId, id)).returning();
    return "Insurance update successfully";

};

//delete insurance service
export const deleteInsuranceService = async (id: number) => {
    const deleted = await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceId, id)).returning();
    if (deleted.length === 0) {
        return "Insurance not found";
    }
    return "Insurance deleted successfully";
};