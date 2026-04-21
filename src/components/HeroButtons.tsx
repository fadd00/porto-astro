export default function HeroButtons() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors border border-rose-600 hover:border-rose-700"
            >
                Get In Touch
            </button>
            <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-white/5 text-white rounded-lg font-medium transition-colors border border-gray-600 hover:border-gray-400"
            >
                View Projects
            </button>
            <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-white/5 text-white rounded-lg font-medium transition-colors border border-gray-600 hover:border-gray-400 text-center"
            >
                Download CV
            </a>
        </div>
    );
}