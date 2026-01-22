import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HowItWorks from '../components/HowItWorks';
import { FaUser, FaCalculator, FaMoneyBillWave, FaArrowDown } from 'react-icons/fa';

// --- SVGs for Visual Logic ---
const ConnectorLine = ({ start, end }) => (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <motion.path
            d={`M ${start.x} ${start.y} C ${start.x} ${start.y + 50} ${end.x} ${end.y - 50} ${end.x} ${end.y}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="10 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 0.5 }}
        />
        <motion.circle
            r="4"
            fill="#10b981"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            style={{ offsetPath: `path('M ${start.x} ${start.y} C ${start.x} ${start.y + 50} ${end.x} ${end.y - 50} ${end.x} ${end.y}')` }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
    </svg>
);

const SplitSimulator = () => {
    const [billAmount, setBillAmount] = useState(1200);
    const [peopleCount, setPeopleCount] = useState(4);
    const [splitAmount, setSplitAmount] = useState(0);

    useEffect(() => {
        setSplitAmount(Math.ceil(billAmount / peopleCount));
    }, [billAmount, peopleCount]);

    return (
        <div className="py-20 bg-bg-primary relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-green/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green mb-6"
                    >
                        <FaCalculator />
                        <span className="text-sm font-bold tracking-wider uppercase">Live Logic Demo</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">See the Math in Action</h2>
                    <p className="text-text-secondary">Drag the sliders to simulate a real-world split scenario.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-bg-secondary p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm"
                    >
                        <div className="mb-10">
                            <label className="flex justify-between text-text-secondary mb-4 font-bold">
                                <span>Total Bill Amount</span>
                                <span className="text-white">₹ {billAmount}</span>
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="50"
                                value={billAmount}
                                onChange={(e) => setBillAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
                            />
                        </div>

                        <div className="mb-10">
                            <label className="flex justify-between text-text-secondary mb-4 font-bold">
                                <span>Number of People</span>
                                <span className="text-white">{peopleCount} Riders</span>
                            </label>
                            <input
                                type="range"
                                min="2"
                                max="10"
                                step="1"
                                value={peopleCount}
                                onChange={(e) => setPeopleCount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
                            />
                            <div className="flex justify-between mt-2 px-1">
                                {[2, 4, 6, 8, 10].map(n => (
                                    <span key={n} className="text-xs text-gray-500">{n}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-card p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Calculation</span>
                                <FaCalculator className="text-accent-green opacity-50" />
                            </div>
                            <div className="flex items-end gap-2 text-3xl font-mono text-white">
                                <span>₹{billAmount}</span>
                                <span className="text-accent-green">/</span>
                                <span>{peopleCount}</span>
                                <span className="text-accent-green">=</span>
                                <span className="text-accent-green font-bold">₹{splitAmount}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">Per person calculation is instant and automated.</div>
                        </div>
                    </motion.div>

                    {/* Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative h-[500px] flex flex-col items-center justify-between py-10"
                    >
                        {/* Source: The Bill */}
                        <motion.div
                            key={billAmount}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="relative z-20 w-32 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center text-black font-bold text-xl border-b-4 border-green-800"
                        >
                            <FaMoneyBillWave className="mr-2" />
                            ₹{billAmount}
                            {/* Connector origin point */}
                            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                        </motion.div>

                        {/* Arrow Logic */}
                        <div className="my-4 text-accent-green animate-bounce">
                            <FaArrowDown />
                        </div>

                        {/* Destination: The People */}
                        <div className="relative z-20 flex flex-wrap justify-center gap-4 w-full">
                            <AnimatePresence>
                                {Array.from({ length: peopleCount }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20, scale: 0 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent-green/30 flex items-center justify-center text-white relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-accent-green/10 group-hover:bg-accent-green/20 transition-colors" />
                                            <FaUser className="z-10 text-xl" />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <div className="text-xs text-gray-500">Rider {i + 1}</div>
                                            <div className="text-accent-green font-bold font-mono">₹{splitAmount}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const StoryFlow = () => {
    // Animation phases
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase((prev) => (prev + 1) % 5);
        }, 4000); // 4 seconds per phase
        return () => clearInterval(timer);
    }, []);

    const phases = [
        { title: "Traveling Alone", desc: "Ravi is looking for an auto. It's expensive alone." },
        { title: "AI Scan (500m)", desc: "Spllit AI scans 500m radius for riders going to the same place." },
        { title: "₹1 Token", desc: "Ravi deposits ₹1 (Gold Coin) to confirm intent." },
        { title: "The Match", desc: "AI finds Priya nearby. Same route, same time." },
        { title: "Big Savings", desc: "They share the ride and save 40% instantly!" }
    ];

    return (
        <section className="py-24 bg-bg-secondary relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-accent-green font-bold tracking-widest uppercase text-sm">The Spllit Story</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">A Journey of Savings</h2>
                    <p className="text-text-secondary max-w-xl mx-auto">Watch how our intelligent matchmaking happens in real-time.</p>
                </div>

                {/* Story Stage */}
                <div className="relative max-w-5xl mx-auto h-[400px] bg-bg-primary rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">

                    {/* Progress Indicators */}
                    <div className="absolute top-8 left-0 w-full flex justify-center gap-2 z-20 px-4">
                        {phases.map((p, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`h-1.5 rounded-full transition-all duration-500 ${i === phase ? 'w-12 bg-accent-green' : 'w-4 bg-gray-700'}`} />
                            </div>
                        ))}
                    </div>

                    {/* Animation Area */}
                    <div className="flex-1 relative flex items-center justify-center">

                        {/* Background City Silhouette (Static) */}
                        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none">
                            <svg viewBox="0 0 1000 200" className="w-full h-full text-gray-600 fill-current">
                                <path d="M0,200 L50,150 L100,200 L150,120 L200,200 L250,170 L300,200 L1000,200 Z" />
                                <rect x="20" y="100" width="30" height="100" />
                                <rect x="80" y="120" width="30" height="80" />
                                <rect x="180" y="80" width="40" height="120" />
                                <rect x="300" y="140" width="20" height="60" />
                                <rect x="400" y="100" width="50" height="100" />
                                <rect x="550" y="130" width="30" height="70" />
                            </svg>
                        </div>

                        {/* PHASE 0: Alone */}
                        {phase === 0 && (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center mb-4">
                                    <FaUser className="text-3xl text-blue-400" />
                                </div>
                                <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 text-sm animate-pulse">
                                    Searching for ride...
                                </div>
                            </motion.div>
                        )}

                        {/* PHASE 1: AI Scan */}
                        {phase === 1 && (
                            <div className="relative">
                                {/* Radar Effect */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-green/30"
                                    animate={{ width: [0, 400], height: [0, 400], opacity: [1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-green/50"
                                    animate={{ width: [0, 300], height: [0, 300], opacity: [1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                                {/* Center User */}
                                <div className="relative z-10 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                                    <FaUser className="text-white text-2xl" />
                                </div>
                                {/* Found User */}
                                <motion.div
                                    initial={{ scale: 0, x: 50, y: -50 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-[-60px] right-[-100px] w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                                >
                                    <FaUser className="text-white" />
                                    <div className="absolute -bottom-6 text-xs text-pink-400 font-bold whitespace-nowrap">Match Found!</div>
                                </motion.div>
                                <div className="absolute top-0 right-[-140px] text-xs text-accent-green font-mono">500m</div>
                            </div>
                        )}

                        {/* PHASE 2: Token */}
                        {phase === 2 && (
                            <div className="flex items-center gap-20">
                                <div className="flex flex-col items-center opacity-50">
                                    <FaUser className="text-4xl text-blue-400 mb-2" />
                                    <span className="text-xs">Ravi</span>
                                </div>
                                <motion.div
                                    initial={{ x: -60, y: 0, rotate: 0 }}
                                    animate={{ x: 60, y: -20, rotate: 360 }}
                                    transition={{ duration: 1 }}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-400 border-4 border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center z-10"
                                >
                                    <span className="text-xl font-black text-yellow-800">₹1</span>
                                </motion.div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-accent-green/20 border border-accent-green flex items-center justify-center">
                                        <FaMoneyBillWave className="text-2xl text-accent-green" />
                                    </div>
                                    <span className="text-xs mt-2 text-accent-green">Commit</span>
                                </div>
                            </div>
                        )}

                        {/* PHASE 3: Match */}
                        {phase === 3 && (
                            <div className="flex items-center gap-32 relative">
                                {/* Connecting Line */}
                                <motion.div
                                    className="absolute top-1/2 left-10 right-10 h-1 bg-accent-green"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div
                                    initial={{ x: -20 }}
                                    animate={{ x: 20 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="relative z-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-bg-primary"
                                >
                                    <FaUser className="text-3xl text-white" />
                                </motion.div>
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-bg-primary px-4 py-1 rounded-full border border-accent-green text-accent-green text-sm font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    CONNECTED
                                </motion.div>
                                <motion.div
                                    initial={{ x: 20 }}
                                    animate={{ x: -20 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="relative z-10 w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center border-4 border-bg-primary"
                                >
                                    <FaUser className="text-3xl text-white" />
                                </motion.div>
                            </div>
                        )}

                        {/* PHASE 4: Savings */}
                        {phase === 4 && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-green to-accent-emerald flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                                        <div className="flex -space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center"><FaUser className="text-white" /></div>
                                            <div className="w-12 h-12 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center"><FaUser className="text-white" /></div>
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: -20, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute -top-4 -right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full shadow-lg"
                                    >
                                        SAVED 40%
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Happily On Their Way!</h3>
                                <div className="flex items-center gap-2 text-accent-green">
                                    <FaMoneyBillWave />
                                    <span>₹50 Saved each</span>
                                </div>
                            </motion.div>
                        )}

                    </div>

                    {/* Text Description area for current phase */}
                    <div className="bg-black/40 backdrop-blur-md p-6 border-t border-white/5 h-32 flex items-center justify-center text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={phase}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="max-w-2xl"
                            >
                                <h4 className="text-accent-green font-bold text-lg mb-1">{phases[phase].title}</h4>
                                <p className="text-gray-300">{phases[phase].desc}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowItWorksPage = () => {
    return (
        <div className="pt-20 min-h-screen bg-bg-primary">
            {/* Header Section */}
            <div className="bg-bg-secondary pt-20 pb-10 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-green/50 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-white bg-clip-text text-transparent"
                    >
                        How It <span className="text-accent-green">Works</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-text-secondary max-w-2xl mx-auto"
                    >
                        From finding a ride to settling the cost, Spllit makes shared mobility effortless.
                    </motion.p>
                </div>
            </div>

            {/* Original Timeline Steps */}
            <HowItWorks />

            {/* New Interactive Simulator */}
            <SplitSimulator />

            {/* NEW Story Flow */}
            <StoryFlow />
        </div>
    );
};

export default HowItWorksPage;

