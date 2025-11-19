import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage for MVP
let cards = [
    {
        to: "Thầy Cô",
        message: "Nhân ngày 20/11, em chúc thầy cô luôn mạnh khỏe, hạnh phúc và thành công trong sự nghiệp trồng người!",
        from: "Học sinh cũ",
        background: "bg-gradient-to-br from-pink-100 to-rose-200"
    }
];
console.log(`Server running on http://localhost:${PORT}`);
