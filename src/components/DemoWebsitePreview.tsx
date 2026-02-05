import { memo } from 'react';
import { Palette, Sparkles, Code, Zap, ShoppingBag, Coffee, Smartphone, Dumbbell, Eye, Settings, Share2, Tag } from 'lucide-react';

export const DemoWebsitePreview = memo(function DemoWebsitePreview() {
    return (
        <div className="h-full overflow-y-auto bg-white transition-colors duration-300">
            {/* Navbar */}
            <nav className="sticky top-0 z-10 bg-white border-b transition-colors duration-300" style={{ borderColor: 'var(--demo-secondary)' }}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Palette className="h-6 w-6 transition-colors duration-300" style={{ color: 'var(--demo-primary)' }} />
                            <span className="font-bold text-xl transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>
                                ColorStudio
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#" className="transition-colors duration-300 hover:opacity-80" style={{ color: 'var(--demo-text)' }}>Features</a>
                            <a href="#" className="transition-colors duration-300 hover:opacity-80" style={{ color: 'var(--demo-text)' }}>Pricing</a>
                            <a href="#" className="transition-colors duration-300 hover:opacity-80" style={{ color: 'var(--demo-text)' }}>About</a>
                            <button
                                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
                                style={{
                                    backgroundColor: 'var(--demo-primary)',
                                    color: 'white'
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Color Palette Strip */}
            <section className="py-8 px-6 border-b transition-colors duration-300" style={{ borderColor: 'var(--demo-secondary)' }}>
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-sm font-semibold mb-3 transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>
                        Color Palette Preview
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { label: 'Background', var: '--demo-background' },
                            { label: 'Primary', var: '--demo-primary' },
                            { label: 'Secondary', var: '--demo-secondary' },
                            { label: 'Text', var: '--demo-text' },
                            { label: 'Accent', var: '--demo-accent' },
                        ].map((color, idx) => (
                            <div key={idx} className="text-center">
                                <div
                                    className="h-16 rounded-lg border-2 transition-all duration-300"
                                    style={{
                                        backgroundColor: `var(${color.var})`,
                                        borderColor: 'var(--demo-secondary)'
                                    }}
                                />
                                <p className="text-xs mt-2 font-mono transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>
                                    {color.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1
                        className="text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Design with{' '}
                        <span
                            className="transition-colors duration-300"
                            style={{ color: 'var(--demo-accent)' }}
                        >
                            Beautiful Colors
                        </span>
                    </h1>
                    <p
                        className="text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 opacity-70"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Create stunning color palettes for your next project. Customize, preview, and export Tailwind CSS configurations instantly.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: 'var(--demo-primary)',
                                color: 'white'
                            }}
                        >
                            Start Creating
                        </button>
                        <button
                            className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: 'var(--demo-secondary)',
                                color: 'var(--demo-text)'
                            }}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Plans Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>
                        Pricing Plans
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Individual', price: '$0', period: 'per month', desc: 'Perfect for freelancers or hobbyists starting out.', icon: '💜' },
                            { name: 'Team', price: '$99', period: 'per month', desc: 'Ideal for growing teams that need collaboration tools.', icon: '👁️' },
                            { name: 'Enterprise', price: '$199', period: 'per month', desc: 'Perfect for large organizations with custom needs.', icon: '⭐' },
                        ].map((plan, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--demo-background)',
                                    borderColor: 'var(--demo-secondary)'
                                }}
                            >
                                <div className="mb-4">
                                    <div className="text-3xl mb-2">{plan.icon}</div>
                                    <h3
                                        className="text-lg font-semibold mb-1 transition-colors duration-300"
                                        style={{ color: 'var(--demo-text)' }}
                                    >
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="mb-4">
                                    <span
                                        className="text-4xl font-bold transition-colors duration-300"
                                        style={{ color: 'var(--demo-primary)' }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span
                                        className="text-sm ml-2 transition-colors duration-300"
                                        style={{ color: 'var(--demo-text)', opacity: 0.6 }}
                                    >
                                        {plan.period}
                                    </span>
                                </div>
                                <p
                                    className="text-sm mb-6 transition-colors duration-300"
                                    style={{ color: 'var(--demo-text)', opacity: 0.7 }}
                                >
                                    {plan.desc}
                                </p>
                                <button
                                    className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                                    style={{
                                        backgroundColor: idx === 1 ? 'var(--demo-primary)' : 'var(--demo-accent)',
                                        color: 'white'
                                    }}
                                >
                                    {idx === 2 ? 'Contact us' : 'Get started'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Revenue Chart Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Revenue Chart */}
                        <div
                            className="p-6 rounded-2xl border-2 transition-colors duration-300"
                            style={{
                                backgroundColor: 'var(--demo-background)',
                                borderColor: 'var(--demo-secondary)'
                            }}
                        >
                            <div className="mb-6">
                                <h3
                                    className="text-xl font-semibold mb-2 transition-colors duration-300"
                                    style={{ color: 'var(--demo-text)' }}
                                >
                                    Revenue
                                </h3>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: 'var(--demo-primary)' }} />
                                        <span className="transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Income</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: 'var(--demo-accent)' }} />
                                        <span className="transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Expenses</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: 'var(--demo-text)' }} />
                                        <span className="transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Savings</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span
                                    className="text-4xl font-bold transition-colors duration-300"
                                    style={{ color: 'var(--demo-text)' }}
                                >
                                    $213,000
                                </span>
                                <span
                                    className="ml-3 px-2 py-1 rounded text-xs font-semibold transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--demo-primary)', color: 'white', opacity: 0.8 }}
                                >
                                    +20%
                                </span>
                            </div>
                            {/* Chart Bars */}
                            <div className="flex items-end justify-between h-48 gap-2">
                                {[65, 45, 70, 55, 80, 50, 90, 60, 75, 50, 85, 70].map((height, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col gap-1">
                                        <div
                                            className="rounded-t transition-all duration-300"
                                            style={{
                                                backgroundColor: 'var(--demo-primary)',
                                                height: `${height}%`
                                            }}
                                        />
                                        <div
                                            className="rounded-t transition-all duration-300"
                                            style={{
                                                backgroundColor: 'var(--demo-accent)',
                                                height: `${height * 0.6}%`,
                                                opacity: 0.7
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="space-y-4">
                            <h3
                                className="text-xl font-semibold mb-4 transition-colors duration-300"
                                style={{ color: 'var(--demo-text)' }}
                            >
                                Key Metrics
                            </h3>
                            {[
                                { label: 'Total Revenue', value: '$213,000', change: '+20%', positive: true },
                                { label: 'Active Users', value: '12,847', change: '+12%', positive: true },
                                { label: 'Conversion Rate', value: '24.57%', change: '-4.06%', positive: false },
                            ].map((metric, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--demo-background)' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p
                                                className="text-sm mb-1 transition-colors duration-300"
                                                style={{ color: 'var(--demo-text)', opacity: 0.7 }}
                                            >
                                                {metric.label}
                                            </p>
                                            <p
                                                className="text-2xl font-bold transition-colors duration-300"
                                                style={{ color: 'var(--demo-text)' }}
                                            >
                                                {metric.value}
                                            </p>
                                        </div>
                                        <span
                                            className="px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-300"
                                            style={{
                                                backgroundColor: metric.positive ? 'var(--demo-primary)' : 'var(--demo-accent)',
                                                color: 'white',
                                                opacity: 0.8
                                            }}
                                        >
                                            {metric.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Button States Example */}
            <section className="py-12 px-6">
                <div
                    className="max-w-7xl mx-auto p-8 rounded-3xl transition-colors duration-300"
                    style={{ backgroundColor: 'var(--demo-background)' }}
                >
                    <h2 className="text-2xl font-bold mb-6 transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>
                        Button States
                    </h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center space-y-3">
                            <button
                                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300"
                                style={{ backgroundColor: 'var(--demo-primary)', color: 'white' }}
                            >
                                Primary
                            </button>
                            <p className="text-xs transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Default</p>
                        </div>
                        <div className="text-center space-y-3">
                            <button
                                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 opacity-80"
                                style={{ backgroundColor: 'var(--demo-primary)', color: 'white' }}
                            >
                                Primary
                            </button>
                            <p className="text-xs transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Hover</p>
                        </div>
                        <div className="text-center space-y-3">
                            <button
                                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300"
                                style={{ backgroundColor: 'var(--demo-accent)', color: 'white' }}
                            >
                                Accent
                            </button>
                            <p className="text-xs transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Active</p>
                        </div>
                        <div className="text-center space-y-3">
                            <button
                                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 opacity-40"
                                style={{ backgroundColor: 'var(--demo-primary)', color: 'white' }}
                            >
                                Primary
                            </button>
                            <p className="text-xs transition-colors duration-300" style={{ color: 'var(--demo-text)' }}>Disabled</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-6">
                <div
                    className="max-w-7xl mx-auto p-8 rounded-3xl transition-colors duration-300"
                    style={{ backgroundColor: 'var(--demo-background)' }}
                >
                    <h2
                        className="text-3xl font-bold text-center mb-12 transition-colors duration-300"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { emoji: '🛒', label: 'Grocery Stores' },
                            { emoji: '☕', label: 'Cafe and Restaurants' },
                            { emoji: '💡', label: 'Utilities' },
                            { emoji: '⚽', label: 'Sport' },
                            { emoji: '🚕', label: 'Taxi' },
                            { emoji: '💊', label: 'Pharmacies' },
                            { emoji: '📱', label: 'Telecom service' },
                            { emoji: '💻', label: 'Gadgets' },
                        ].map((category, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: 'white' }}
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--demo-primary)' }}
                                >
                                    <span className="text-4xl">{category.emoji}</span>
                                </div>
                                <span
                                    className="text-sm font-medium text-center transition-colors duration-300"
                                    style={{ color: 'var(--demo-text)' }}
                                >
                                    {category.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-3xl font-bold text-center mb-12 transition-colors duration-300"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Statistics
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { label: 'Home Renovation', value: '$10,000', progress: 75, min: '$8,250', max: '$1,750' },
                            { label: 'Education & Courses', value: '$40,000', progress: 60, min: '$19,500', max: '$20,500' },
                            { label: 'Health & Wellness', value: '$5,500', progress: 45, min: '$3,000', max: '$2,500' },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-xl border-2 transition-all duration-300"
                                style={{
                                    backgroundColor: 'var(--demo-background)',
                                    borderColor: 'var(--demo-secondary)'
                                }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3
                                            className="font-semibold mb-1 transition-colors duration-300"
                                            style={{ color: 'var(--demo-text)' }}
                                        >
                                            {stat.label}
                                        </h3>
                                        <p
                                            className="text-2xl font-bold transition-colors duration-300"
                                            style={{ color: 'var(--demo-primary)' }}
                                        >
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="h-2 rounded-full overflow-hidden transition-colors duration-300"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <div
                                            className="h-full transition-all duration-300"
                                            style={{
                                                backgroundColor: 'var(--demo-primary)',
                                                width: `${stat.progress}%`
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs transition-colors duration-300" style={{ color: 'var(--demo-text)', opacity: 0.7 }}>
                                        <span>{stat.min}</span>
                                        <span>{stat.max}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6">
                <div
                    className="max-w-7xl mx-auto p-8 rounded-3xl transition-colors duration-300"
                    style={{ backgroundColor: 'var(--demo-background)' }}
                >
                    <h2
                        className="text-3xl font-bold text-center mb-12 transition-colors duration-300"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Powerful Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Palette, title: 'Color Customization', desc: 'Pick and customize colors with our intuitive color picker' },
                            { icon: Sparkles, title: 'Live Preview', desc: 'See your changes in real-time as you design' },
                            { icon: Code, title: 'Export Ready', desc: 'Export Tailwind CSS or CSS variables instantly' },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: 'var(--demo-secondary)'
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--demo-primary)' }}
                                >
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-2 transition-colors duration-300"
                                    style={{ color: 'var(--demo-text)' }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="transition-colors duration-300 opacity-70"
                                    style={{ color: 'var(--demo-text)' }}
                                >
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div
                    className="max-w-4xl mx-auto rounded-2xl p-12 text-center transition-colors duration-300"
                    style={{ backgroundColor: 'var(--demo-primary)' }}
                >
                    <Zap className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 text-white opacity-90">
                        Join thousands of designers creating beautiful color palettes
                    </p>
                    <button
                        className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: 'var(--demo-accent)',
                            color: 'white'
                        }}
                    >
                        Create Your Palette
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-8 px-6 border-t transition-colors duration-300"
                style={{ borderColor: 'var(--demo-secondary)' }}
            >
                <div className="max-w-7xl mx-auto text-center">
                    <p
                        className="transition-colors duration-300 opacity-60"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        © 2026 ColorStudio. All rights reserved.
                    </p>
                    <p
                        className="transition-colors duration-300 opacity-60 mt-2"
                        style={{ color: 'var(--demo-text)' }}
                    >
                        Made with ❤️ by Jainil Patel
                    </p>
                </div>
            </footer>
        </div>
    );
});
