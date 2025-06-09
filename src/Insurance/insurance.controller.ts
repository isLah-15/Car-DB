import { Request, Response } from "express";

import { createInsuranceService, deleteInsuranceService, getAllInsuranceService, getInsuranceById, updateInsuranceService } from "./insurance.service";

// Create a insurance
export const createInsuranceController = async (req: Request, res: Response) => {
    try {
        const insurance = req.body;

        // Convert the insurance start date to a date object if provided
        if (insurance.startDate) {
            insurance.startDate = new Date(insurance.startDate);
        }

        // Convert the insurance end date to a date object if provided
        if (insurance.endDate) {
            insurance.endDate = new Date(insurance.endDate);
        }

        const newInsurance =  await createInsuranceService(insurance);
        if (newInsurance) {
            return res.status(201).json({ message: "Insurance created successfully", data: newInsurance });
        } else {
            return res.status(400).json({ message: "Failed to create insurance" });
        }

    }catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

};

// Get all insurances
export const getAllInsurancesController = async (req: Request, res: Response) => {
    try {
        const insurances = await getAllInsuranceService();
        if (insurances.length === 0) {
            return res.status(404).json({ message: "No insurances found" });
        }
        return res.status(200).json({ message: "Insurances retrieved successfully", data: insurances });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//Get a insurance by id
export const getInsuranceByIdController = async (req: Request, res: Response) => {
    try {
        const insuranceId = parseInt(req.params.id);
        if(isNaN(insuranceId)){
        return res.status(400).json({message: "Invalid ID"})
        }

        const insurance = await getInsuranceById(insuranceId);
        if (!insurance) {
            return res.status(404).json({message: "Insurance not found"});
        }

        return res.status(200).json({data: insurance});

    } catch (error: any) {
        return res.status(500).json({error: error.message});
    };
};

// Update a insurance by id
export const updateInsuranceController = async (req: Request, res: Response) => {
    try {
        const insuranceId = parseInt(req.params.id);
        if(isNaN(insuranceId)) {
            return res.status(400).json({ message: "Invalid insurance ID" });
        }

        const insurance = req.body;

        // Convert the start date to a date object if provided
        if (insurance.startDate) {
            insurance.startDate = new Date(insurance.startDate);
        }

        // Convert the end date to a date object if provided
        if (insurance.endDate) {
            insurance.endDate = new Date(insurance.endDate);
        }

        //Check if the insurance exists
        const existingInsurance = await getInsuranceById(insuranceId);
        if (!existingInsurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }

        //Check if the insurance ID is provided in the request body
        if (!insurance.insuranceId) {
            return res.status(400).json({ message: "Insurance ID is required" });
        }

        //check if the insurance ID in the request body matches the insurance ID in the URL
        if (insurance.insuranceId !== insuranceId) {
            return res.status(400).json({ message: "Insurance ID in request body does not match URL" });
        }

        // Update the insurance
        insurance.insuranceId = insuranceId; // Ensure the insurance ID is set for the update


        const updatedInsurance = await updateInsuranceService(insuranceId, insurance);
        if (updatedInsurance) {
            return res.status(200).json({ message: "Insurance updated successfully", data: updatedInsurance });
        } else {
            return res.status(400).json({ message: "Failed to update insurance" });
        }

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete a insurance by id
export const deleteInsuranceController = async (req: Request, res: Response) => {
    try {
        const insuranceId = parseInt(req.params.id);
        if(isNaN(insuranceId)) {
            return res.status(400).json({ message: "Invalid insurance ID" });
        }

        const existingInsurance = await getInsuranceById(insuranceId);
        if (!existingInsurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }

        const deleted = await deleteInsuranceService(insuranceId);
        if (!deleted) {
            return res.status(404).json({message: "Insurance not found"})
        }

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    } res.sendStatus(204).json({ message: "Insurance deleted successfully" });
};
