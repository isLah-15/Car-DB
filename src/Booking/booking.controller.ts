
import { Request, Response } from "express";
import { createBookingService, deleteBookingService, getAllBookingService, getBookingsById, updateBookingService } from "./booking.service";


// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
    try {
        const booking = req.body;

        //convert rental start date and rental end date to a date object if provided
        if (booking.rentalStartDate) {
            booking.rentalStartDate = new Date(booking.rentalStartDate);
        };

        if (booking.rentalEndDate) {
            booking.rentalEndDate = new Date(booking.rentalEndDate);
        };

        console.log("========So far so good========");

        const newBooking =  await createBookingService(booking);
        if (newBooking) {
            return res.status(201).json({ message: "Booking created successfully", data: newBooking });
        } else {
            return res.status(400).json({ message: "Failed to create booking" });
        }
        
    }catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

};

// Get all bookings
export const getAllBookingsController = async (req: Request, res: Response) => {
    try {
        const bookings = await getAllBookingService();
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ message: "Bookings retrieved successfully", data: bookings });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//Get a booking by id
export const getAllBookingsByIdController = async (req: Request, res: Response) => {
    try {
        const bookingId = parseInt(req.params.id);
        if(isNaN(bookingId)){
        return res.status(400).json({message: "Invalid ID"})
        }

        const booking = await getBookingsById(bookingId);
        if (!booking) {
            return res.status(404).json({message: "booking not found"});
        }

        return res.status(200).json({data: booking});

    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// Update a booking
export const updateBookingController = async (req: Request, res: Response) => {
    try {
        const bookingId = parseInt(req.params.id);
        if(isNaN(bookingId)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const booking = req.body;

        //convert rental start date and rental end date to a Date object if provided
        if (booking.rentalStartDate) {
            booking.rentalStartDate = new Date(booking.rentalEndDate);
        };

        if (booking.rentalEndDate) {
            booking.rentalEndDate = new Date(booking.rentalEndDate);
        };

        // Check if the booking exists
        const existingBooking = await getBookingsById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        };

        // Check if the booking ID is provided in the request body
        if (!booking.bookingId) {
            return res.status(400).json({ message: "Booking ID is not provided" });
        };

        // Update the booking
        booking.bookingId = bookingId; // Ensure the booking ID is set for the update

        const updatedBooking = await updateBookingService(bookingId, booking);
        if (updatedBooking) {
            return res.status(200).json({ message: "Booking updated successfully", data: updatedBooking });
        } else {
            return res.status(400).json({ message: "Failed to update booking" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    };
};


// Delete a booking by ID
export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const bookingId = parseInt(req.params.id);
        if(isNaN(bookingId)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const existingBooking = await getBookingsById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        };

        const deleted = await deleteBookingService(bookingId);
        if (!deleted) {
            return res.status(404).json({message: "Booking not found"})
        } 
        res.sendStatus(204);

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
