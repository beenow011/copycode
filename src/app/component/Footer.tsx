import Link from 'next/link';
import { BasicStarReview } from './Feedback';

const Footer = () => {
    return (
        <footer className="bg-purple-500 text-white p-6 rounded-t-lg mt-12">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">About This Site</h3>
                    <p className="text-gray-200">
                        Welcome to the <span className="font-semibold">Ultimate Question & Answer Portal</span>!
                        We don&rsquo;t have the answers to life&rsquo;s deepest mysteries, but we can help with your multiple-choice questions, scans, and maybe even your code!
                        Our servers are powered by a mix of coffee and pure optimism. ☕✨
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">About Me</h3>
                    <p className="text-gray-200">
                        Hi, I&rsquo;m WebbyNow! I&rsquo;m a web enthusiast who turns caffeine into code with a touch of magic.
                        When I&rsquo;m not busy fixing bugs or adding features, you&rsquo;ll find me pondering the mysteries of the web or binge-watching sci-fi shows.
                        Feel free to reach out and say hi, or share your favorite meme! 🚀💻
                    </p>
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-gray-300 mb-2">
                    © {new Date().getFullYear()} Abhinav&rsquo;s World of Wonders. All rights reserved.
                </p>
                <div className="flex justify-center gap-4 mb-4">
                    <a href="https://github.com/beenow011" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-gray-300">
                        GitHub
                    </a>
                    <a href="mailto:abhinavnb11@gmail.com" className="text-gray-100 hover:text-gray-300">
                        Email
                    </a>
                    <a href="tel:+91-8277123450" className="text-gray-100 hover:text-gray-300">
                        Phone
                    </a>
                    <a href="https://www.instagram.com/abhinav_nb/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-gray-300">
                        Instagram
                    </a>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 justify-center items-center'>
                    <BasicStarReview
                        rating={4}
                        text="now, I can clear any interviews OA!"
                    />

                </div>
            </div>
        </footer>
    );

};

export default Footer;
