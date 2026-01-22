import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Features from '../components/Features';

const AnimatedCoin = ({ id, onComplete }) => {
    return (
        <motion.div
            initial={{ x: -100, y: -50, opacity: 0, rotate: 0, scale: 1 }}
            animate={{
                x: [0, 20, 0],
                y: [0, -80, 200],
                opacity: [0, 1, 1, 0],
                rotate: [0, 180, 360, 540],
                scale: [0.5, 1, 0.8, 0.3]
            }}
            transition={{
                duration: 1.2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeIn"
            }}
            onAnimationComplete={onComplete}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
        >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(251,191,36,0.6)] border-4 border-yellow-500 flex items-center justify-center">
                <span className="text-2xl font-black text-yellow-900">₹</span>
            </div>
        </motion.div>
    );
};

const LightweightJar = ({ coinCount, shake }) => {
    const fillPercentage = Math.min((coinCount / 20) * 100, 100);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Jar SVG */}
            <motion.div
                animate={{
                    x: shake ? [0, -5, 5, -5, 5, 0] : 0,
                    rotate: shake ? [0, -2, 2, -2, 2, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-96"
            >
                {/* Glass Jar Body */}
                <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
                    {/* Jar body with glass effect */}
                    <defs>
                        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#f0f9ff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>

                    {/* Jar main body */}
                    <path
                        d="M 60 40 L 60 240 Q 60 260 80 260 L 120 260 Q 140 260 140 240 L 140 40 Q 140 30 130 30 L 70 30 Q 60 30 60 40 Z"
                        fill="url(#glassGradient)"
                        stroke="#bae6fd"
                        strokeWidth="3"
                        className="transition-all duration-300"
                    />

                    {/* Jar rim (metallic) */}
                    <ellipse cx="100" cy="30" rx="45" ry="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                    <ellipse cx="100" cy="28" rx="45" ry="6" fill="#e2e8f0" />

                    {/* Highlight/shine effect */}
                    <path
                        d="M 75 50 Q 75 100 75 200"
                        stroke="white"
                        strokeWidth="4"
                        opacity="0.3"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Coins filling the jar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 overflow-hidden transition-all duration-500"
                    style={{ height: `${fillPercentage * 2.3}px` }}
                >
                    <div className="relative w-full h-full">
                        {/* Stacked coins */}
                        {Array.from({ length: Math.min(coinCount, 20) }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="absolute w-full"
                                style={{
                                    bottom: `${i * 11}px`,
                                    left: `${(i % 3) * 8 - 8}px`
                                }}
                            >
                                <div className="w-12 h-3 mx-auto rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-md border-t-2 border-yellow-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sparkles around jar */}
                {coinCount > 0 && (
                    <>
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-4 -right-4 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="absolute top-1/2 -right-6 w-2 h-2 bg-accent-green rounded-full blur-sm"
                        />
                    </>
                )}
            </motion.div>
        </div>
    );
};

const SavingsJackpot = () => {
    const [coins, setCoins] = useState([]);
    const [savings, setSavings] = useState(0);
    const [showRibbon, setShowRibbon] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSave = () => {
        const id = Date.now();
        setCoins(prev => [...prev, id]);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        // Show celebration every 5 coins or on first coin
        if ((savings + 1) % 5 === 0 || savings === 0) {
            setShowConfetti(true);
            setShowRibbon(true);
            setTimeout(() => {
                setShowConfetti(false);
                setShowRibbon(false);
            }, 3000);
        }
    };

    const removeCoin = (id) => {
        setCoins(prev => prev.filter(c => c !== id));
        setSavings(prev => prev + 1);
    };

    return (
        <section className="py-32 relative overflow-hidden bg-bg-primary">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative h-[700px] rounded-[4rem] bg-gradient-to-b from-black/60 to-black/20 border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-hidden group">

                        {/* Confetti Effect */}
                        <AnimatePresence>
                            {showConfetti && (
                                <div className="absolute inset-0 z-40 pointer-events-none">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                x: '50%',
                                                y: '50%',
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            animate={{
                                                x: `${Math.random() * 100}%`,
                                                y: `${Math.random() * 100}%`,
                                                opacity: 0,
                                                scale: 0,
                                                rotate: Math.random() * 360
                                            }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="absolute w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: ['#10b981', '#fbbf24', '#f59e0b', '#34d399'][i % 4]
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Animated Coins */}
                        <AnimatePresence>
                            {coins.map(id => (
                                <AnimatedCoin key={id} id={id} onComplete={() => removeCoin(id)} />
                            ))}
                        </AnimatePresence>

                        {/* Jar Container */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <LightweightJar coinCount={savings} shake={isShaking} />
                        </div>

                        {/* Congratulations Ribbon */}
                        <AnimatePresence mode="wait">
                            {showRibbon && (
                                <motion.div
                                    initial={{ opacity: 0, y: -50, scale: 0.5 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 50, scale: 0.5 }}
                                    className="absolute top-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-6"
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-accent-green/20 blur-2xl rounded-full"></div>
                                        <div className="relative bg-gradient-to-r from-accent-green via-accent-emerald to-accent-green bg-[length:200%_auto] animate-gradient px-8 py-5 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] border border-white/20 text-center">
                                            <p className="text-black font-black text-2xl font-poppins mb-1">
                                                🎉 JACKPOT!
                                            </p>
                                            <p className="text-black/90 font-bold text-lg font-poppins">
                                                You saved 1 Carbon Coin
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Savings Counter */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-6">
                            <motion.div
                                key={savings}
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-white/5 backdrop-blur-2xl border border-white/20 px-10 py-6 rounded-[2.5rem] text-center shadow-2xl"
                            >
                                <p className="text-accent-green text-xs uppercase tracking-[0.3em] font-black mb-2 font-poppins">Total Carbon Savings</p>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-5xl font-black text-white font-poppins">{savings}</span>
                                    <span className="text-accent-green text-xl font-bold font-poppins">COINS</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-green rounded-full blur-[120px]"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-emerald rounded-full blur-[120px]"></div>
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100px" }}
                            className="h-1.5 bg-accent-green mb-10 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                        ></motion.div>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.9] font-poppins tracking-tighter">
                            The Savings <br />
                            <span className="text-accent-green">Jackpot.</span>
                        </h2>
                        <p className="text-text-secondary text-2xl leading-relaxed mb-14 font-light font-poppins">
                            Every trip you split contributes to your personal carbon jackpot. Watch your impact grow in real-time with our savings engine.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(16,185,129,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="bg-accent-green text-black px-16 py-8 rounded-full font-black text-2xl shadow-2xl transition-all duration-300 flex items-center gap-6 group font-poppins"
                        >
                            <span>SAVE NOW</span>
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                💰
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturesPage = () => {
    return (
        <div className="bg-bg-primary min-h-screen">
            <div className="pt-48 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-bold tracking-[0.2em] uppercase mb-8 font-poppins"
                    >
                        Next-Gen Features
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold mb-8 text-white font-poppins"
                    >
                        Engineered for <br />
                        <span className="bg-gradient-to-r from-accent-green via-accent-emerald to-accent-lime bg-clip-text text-transparent">Efficiency</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed font-poppins"
                    >
                        Explore the cutting-edge technology behind Spllit's shared mobility infrastructure. Built for scale, designed for simplicity.
                    </motion.p>
                </div>
            </div>

            <SavingsJackpot />

            <div className="py-20">
                <Features />
            </div>
        </div>
    );
};

export default FeaturesPage;
