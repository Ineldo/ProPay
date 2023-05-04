const express= require('express');
const helmet = require("helmet");
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

const cors= require('cors');
const morgan= require("morgan");


const { fileURLToPath } = require("url");
const bodyParser= require("body-parser");;




dotenv.config({ path:'.env'})
const app = express();
app.use(helmet());
app.use(express.json());//to accept json data
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();

const PORT= process.env.PORT||5050;

app.get('/', (req, res) => {
    res.send("API running")
})
//routes middleware
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(notFound)
app.use(errorHandler)




app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`)} )
