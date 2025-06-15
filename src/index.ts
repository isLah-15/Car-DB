import express from 'express'
import "dotenv/config";
import booking from './Booking/booking.router'
import carRoutes from './Car/car.router';
import customerRoutes from './Customer/customer.router';
import insuranceRoutes from './Insurance/insurance.router';
import locationRoutes from './Location/location.router';
import maintenanceRoutes from './Maintenance/maintenance.router';
import paymentRoutes from './Payment/payment.router';
import reservationRoutes from './Reservation/reservation.router';

// const initilizeApp = () => {
    const app = express();
    app.use(express.json()); //used to parse JSON bodies

    // routes
    booking(app);
    carRoutes(app);
    customerRoutes(app);
    insuranceRoutes(app);
    locationRoutes(app);
    maintenanceRoutes(app);
    paymentRoutes(app);
    reservationRoutes(app);
    

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    })

    app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');

    // return app;

// }

// const app = initilizeApp();
// export default app;

// const app = express();
// app.use(express.json());


// // routes


// app.get('/',  (req, res) => {
//     res.send("welcome to my api")
// })

// app.listen(8081, () => {
//     console.log("Server is running")
})