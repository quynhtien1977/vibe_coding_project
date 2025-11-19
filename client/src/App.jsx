import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

function App() {
    const [isOpen, setIsOpen] = useState(false)
    const [showText, setShowText] = useState(false)

    const handleOpen = () => {
        if (isOpen) return
        setIsOpen(true)
        // Delay text appearance slightly to match animation
        setTimeout(() => setShowText(true), 1500)
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center overflow-hidden relative"
        >

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20 animate-pulse"
                        style={{
                            width: Math.random() * 4 + 'px',
                            height: Math.random() * 4 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: Math.random() * 3 + 2 + 's'
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className={`absolute top-10 transition-all duration-1000 ${isOpen ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
                <h1 className="text-4xl md:text-6xl font-serif text-premium-gold text-center mb-4 tracking-wider">
                    Ngày Nhà Giáo Việt Nam
                </h1>
                <p className="text-cream text-center text-lg font-light tracking-widest uppercase">
                    Chạm vào quà để mở
                </p>
            </div>

            {/* Main Scene */}
            <div className="relative gift-container flex items-center justify-center">

                {/* Gift Box */}
                <div
                    className={`gift-box ${isOpen ? 'open' : ''}`}
                    onClick={handleOpen}
                >
                    <div className="lid">
                        <div className="bow"></div>
                    </div>
                    <div className="box-body"></div>
                </div>

                {/* The Letter */}
                <div
                    className="letter-container font-serif text-center bg-[#fff9f0] border-2 border-premium-gold p-8 md:p-12 max-w-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="border-b-2 border-deep-red pb-4 mb-6">
                        <h2 className="text-3xl font-bold text-deep-red mb-2">Gửi Thầy Cô Kính Yêu</h2>
                        <div className="flex justify-center gap-2 text-premium-gold">
                            <Sparkles size={20} />
                            <Sparkles size={20} />
                            <Sparkles size={20} />
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-800 leading-relaxed text-lg italic">
                        {showText && (
                            <>
                                <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                    "Nhân ngày Nhà giáo Việt Nam 20/11,"
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
                                    Em xin gửi đến thầy cô lời tri ân sâu sắc nhất.
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: '3s' }}>
                                    Cảm ơn thầy cô đã luôn tận tụy, kiên nhẫn và yêu thương,
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: '4.5s' }}>
                                    Dẫn dắt chúng em đến bến bờ tri thức.
                                </p>
                                <p className="animate-fade-in font-bold text-deep-red mt-6" style={{ animationDelay: '6s' }}>
                                    Chúc thầy cô luôn mạnh khỏe và hạnh phúc! ❤️
                                </p>
                            </>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                        <span>20/11/2025</span>
                        <span>Từ: Trò của thầy/cô</span>
                    </div>
                </div>

            </div>

            {/* Reset Button (Only visible after open) */}
            {isOpen && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                        setShowText(false);
                    }}
                    className="absolute bottom-10 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm z-50"
                >
                    Close & Re-wrap
                </button>
            )}

        </div>
    )
}

export default App
