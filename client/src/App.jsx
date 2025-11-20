import { useState, useEffect, useRef } from 'react'
import { Sparkles, ChevronDown, Heart, Star, Music, Volume2, VolumeX, Play, Sun, Moon } from 'lucide-react'

// Reusable Section Component with Scroll Animation
const ScrollSection = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <div
            ref={sectionRef}
            className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                } ${className}`}
        >
            {children}
        </div>
    )
}

function App() {
    const [isOpen, setIsOpen] = useState(false)
    const [showText, setShowText] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [theme, setTheme] = useState(() => {
        // Get theme from localStorage or default to 'dark'
        return localStorage.getItem('theme') || 'dark'
    })
    const audioRef = useRef(null)

    // Save theme to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    }

    const handleStart = () => {
        setHasStarted(true)
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true)
            }).catch(e => console.log("Audio play failed:", e))
        }
    }

    const handleOpen = () => {
        if (isOpen) return
        setIsOpen(true)
        setTimeout(() => setShowText(true), 1500)
    }

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-dark-bg-start to-dark-bg-end text-dark-text' : 'from-light-bg-start to-light-bg-end text-light-text'} relative min-h-screen`}>

            {/* Welcome Overlay */}
            {!hasStarted && (
                <div
                    className={`fixed inset-0 z-[100] ${theme === 'dark' ? 'bg-gray-900' : 'bg-light-bg-start'} flex flex-col items-center justify-center cursor-pointer`}
                    onClick={handleStart}
                >
                    <div className="text-center space-y-6 animate-pulse">
                        <h1 className="text-4xl md:text-6xl font-serif text-premium-gold tracking-widest">
                            Chào Mừng
                        </h1>
                        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-light-text-secondary'} text-lg uppercase tracking-widest`}>
                            Chạm để bắt đầu
                        </p>
                        <div className="flex justify-center mt-8">
                            <div className="w-16 h-16 rounded-full border-2 border-premium-gold flex items-center justify-center">
                                <Play className="text-premium-gold ml-1" size={32} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/audio/snaptik.vn_uiW1O.mp3" type="audio/mpeg" />
            </audio>

            {/* Music Toggle Button (Fixed) */}
            {hasStarted && (
                <>
                    <button
                        onClick={toggleMusic}
                        className={`fixed top-6 right-6 z-50 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-gray-900/10 border-gray-900/20'} backdrop-blur-md p-3 rounded-full hover:bg-opacity-30 transition-all border`}
                    >
                        {isPlaying ? <Volume2 size={24} className="text-premium-gold" /> : <VolumeX size={24} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />}
                    </button>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`fixed top-6 right-20 z-50 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-gray-900/10 border-gray-900/20'} backdrop-blur-md p-3 rounded-full hover:bg-opacity-30 transition-all border`}
                    >
                        {theme === 'dark' ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-700" />}
                    </button>
                </>
            )}

            {/* Background Particles (Fixed) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute ${theme === 'dark' ? 'bg-white' : 'bg-premium-gold'} rounded-full ${theme === 'dark' ? 'opacity-20' : 'opacity-30'} animate-pulse`}
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

            {/* Section 1: Hero / Intro */}
            <ScrollSection className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-serif text-premium-gold text-center mb-6 tracking-wider animate-fade-in">
                    Ngày Nhà Giáo Việt Nam
                </h1>
                <p className={`${theme === 'dark' ? 'text-cream' : 'text-light-text-secondary'} text-center text-xl font-light tracking-widest uppercase mb-12 opacity-90`}>
                    20 Tháng 11
                </p>
                <div className="animate-bounce mt-10">
                    <ChevronDown size={40} className={theme === 'dark' ? 'text-white/50' : 'text-light-text-secondary/50'} />
                </div>
            </ScrollSection>

            {/* Section 2: Memories / Appreciation */}
            <ScrollSection className="relative z-10">
                <div className="max-w-3xl text-center space-y-8">
                    <div className="flex justify-center mb-6">
                        <Heart size={48} className="text-deep-red animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-premium-gold mb-8">
                        Hành Trình Tri Thức
                    </h2>
                    <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-light-text-secondary'} leading-relaxed italic`}>
                        "Mỗi bài giảng là một viên gạch xây dựng nên tương lai.<br />
                        Mỗi lời khuyên là ngọn đèn soi sáng con đường phía trước."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-light-border shadow-md'} p-6 rounded-lg backdrop-blur-sm border hover:border-premium-gold transition-colors`}>
                            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-premium-gold">Tận Tâm</h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-light-text-secondary'}`}>Luôn hết lòng vì học sinh thân yêu.</p>
                        </div>
                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-light-border shadow-md'} p-6 rounded-lg backdrop-blur-sm border hover:border-premium-gold transition-colors`}>
                            <Music className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-premium-gold">Cảm Hứng</h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-light-text-secondary'}`}>Truyền lửa đam mê và sáng tạo.</p>
                        </div>
                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-light-border shadow-md'} p-6 rounded-lg backdrop-blur-sm border hover:border-premium-gold transition-colors`}>
                            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-premium-gold">Yêu Thương</h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-light-text-secondary'}`}>Như người cha, người mẹ thứ hai.</p>
                        </div>
                    </div>
                </div>
            </ScrollSection>

            {/* Section 3: The Gift */}
            <ScrollSection className="relative z-10">
                <div className="text-center mb-10">
                    <h2 className={`text-3xl md:text-4xl font-serif ${theme === 'dark' ? 'text-white' : 'text-light-text'} mb-4`}>
                        Một Món Quà Nhỏ
                    </h2>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-light-text-secondary'}>
                        Gửi gắm tấm lòng tri ân
                    </p>
                </div>

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
                            <span>Từ: Học trò của thầy/cô</span>
                        </div>
                    </div>
                </div>
            </ScrollSection>

            {/* Reset Button (Fixed Position) */}
            {isOpen && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                        setShowText(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`fixed bottom-10 left-1/2 -translate-x-1/2 ${theme === 'dark' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-light-text hover:bg-gray-100'} border border-premium-gold transition-all px-6 py-3 rounded-full flex items-center gap-2 text-sm z-50 shadow-lg`}
                >
                    Đóng & Bọc lại
                </button>
            )}

        </div>
    )
}

export default App
