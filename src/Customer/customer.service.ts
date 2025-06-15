
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { CustomerTable, ReservationTable, TICustomer } from "../Drizzle/schema";



// create customer service
export const createCustomerService = async (customer: TICustomer) => {
    const [inserted] = await db.insert(CustomerTable).values(customer).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

//get all customer service with reservation details
export const getAllCustomerService = async () => {
  const customers = await db.query.CustomerTable.findMany({
    with: {
      reservations: true,
    },
  });

  if (customers.length === 0) {
    return "No customers found";
  }

  return customers;
};
  
//get customer by id with reservation details
export const getAllCustomerByIdService = async (customerId: number) => {
  const customers = await db.query.CustomerTable.findMany({
    with: {
      reservations: true,
    },
  });

  if (customers.length === 0) {
    return "No customers found";
  }

  return customers;
};

//update customer service
export const updateCustomerService = async (id: number, customer: TICustomer) => {
    await db.update(CustomerTable).set(customer).where(eq(CustomerTable.customerId, id)).returning();
    return "Customer update successfully";

};

//delete customer service
export const deleteCustomerService = async (id: number) => {
    const deleted = await db.delete(CustomerTable).where(eq(CustomerTable.customerId, id)).returning();
    if (deleted.length === 0) {
        return "Customer not found";
    }
    return "Customer deleted successfully";
};


