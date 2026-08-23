const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const  routes  = require('./routes/authRoutes')

const app = express();
dotenv.config();
connectDB();
app.use(cors(
    {
        origin: ['http://localhost:3000',
          'mongodb+srv://pankajkumarchauhan_shopnest_MERN:12345@cluster0.8vuvdj9.mongodb.net/shopnestdb',
           process.env.FRONTEND_URL],
        credentials: true
    }
))
app.use(express.json());
app.use(express.urlencoded ({ extended: true}));


app.get("/", (req, resp) => {
    resp.send("ShopNest Backend is Working !");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('api/analytics', require('./routes/analyticsRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}


const PORT = process.env.PORT || 4800
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})