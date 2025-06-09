import { Request, Response } from "express";
import { createCustomerService, deleteCustomerService, getAllCustomerService, getCustomerById, updateCustomerService } from "./customer.service";

// Create a customer
export const createCustomerController = async (req: Request, res: Response) => {
    try {
        const customer = req.body;

        const newCustomer =  await createCustomerService(customer);
        if (newCustomer) {
            return res.status(201).json({ message: "Customer created successfully", data: newCustomer });
        } else {
            return res.status(400).json({ message: "Failed to create customer" });
        }

    }catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

};


// Get all customers
export const getAllCustomersController = async (req: Request, res: Response) => {
    try {
        const customers = await getAllCustomerService();
        if (customers.length === 0) {
            return res.status(404).json({ message: "No customers found" });
        }
        return res.status(200).json({ message: "Customers retrieved successfully", data: customers });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//Get a customer by id
export const getCustomerByIdController = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.id);
        if(isNaN(customerId)){
        return res.status(400).json({message: "Invalid ID"})
        }

        const customer = await getCustomerById(customerId);
        if (!customer) {
            return res.status(404).json({message: "Customer not found"});
        }

        return res.status(200).json({data: customer});

    } catch (error: any) {
        return res.status(500).json({error: error.message});
    };
};

// Update a customer by id
export const updateCustomerController = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.id);
        if(isNaN(customerId)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }

        const customer = req.body;

        //Check if the customer exists
        const existingCustomer = await getCustomerById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        //Check if the customer ID is provided in the request body
        if (!customer.customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        //check if the customer ID in the request body matches the customer ID in the URL
        if (customer.customerId !== customerId) {
            return res.status(400).json({ message: "Customer ID in request body does not match URL" });
        }

        // Update the customer
        customer.customerId = customerId; // Ensure the customer ID is set for the update

        const updatedCustomer = await updateCustomerService(customerId, customer);
        if (updatedCustomer) {
            return res.status(200).json({ message: "Customer updated successfully", data: updatedCustomer });
        } else {
            return res.status(400).json({ message: "Failed to update customer" });
        }

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete a customer by id
export const deleteCustomerController = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.id);
        if(isNaN(customerId)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }

        const existingCustomer = await getCustomerById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const deleted = await deleteCustomerService(customerId);
        if (!deleted) {
            return res.status(404).json({message: "Customer not found"})
        } res.sendStatus(204).json({ message: "Customer deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

