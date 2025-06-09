import { sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { CustomerTable, TICustomer } from "../Drizzle/schema";

//Database
export const createUserService = async (user: TICustomer) => {
    const [createdUser] = await db.insert(CustomerTable).values(user).returning();
    return createdUser;
};


export const getUserByEmailService = async (email: string) => {
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`
    });
};

export const verifyUserService = async (email: string) => {
    await db.update(CustomerTable)
        .set({ verificationCode: null, isVerified: true })
        .where(sql`${CustomerTable.email} = ${email}`);
};


//login a user
export const userLoginService = async (user: TICustomer) => {
    // email and password
    const { email } = user;

      return await db.query.CustomerTable.findFirst({
        columns: {
            customerId: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true,
            isVerified: true
        }, where: sql`${CustomerTable.email} = ${email} `
    })
}