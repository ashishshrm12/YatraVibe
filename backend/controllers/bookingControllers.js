import Booking from "../models/Booking.js"

export const createBooking=async(req,res)=>{
    const newBooking=new Booking(req.body)
    try {
        const savedBooking= await newBooking.save()
        res.status(200).json({
            success:true,
            message:'Your tour is booked',
            data:savedBooking
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Internal server error',
            
        })
    }
};

export const getBooking=async(req,res)=>{
    const id=req.params.id
    try{
        const book= await Booking.findById(id);
        res.status(200)
        .json({
            success:true,
            message:"sucessful",
            data:book
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'not found',
            
        })
    }
};

export const getAllBooking=async(req,res)=>{
    
    try{
        const books= await Booking.find();
        res.status(200)
        .json({
            success:true,
            message:"sucessful",
            data:books
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Error',
            
        })
    }
};

// GET bookings by userId
export const getUserBookings = async (req, res) => {
    const userId = req.params.userId;
    try {
      const bookings = await Booking.find({ userId });
      res.status(200).json({
        success: true,
        message: "User bookings fetched successfully",
        data: bookings,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user bookings",
      });
    }
  };

  // DELETE a booking by ID
export const deleteBooking = async (req, res) => {
    const id = req.params.id;
    try {
      await Booking.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to cancel booking",
      });
    }
  };
  
  