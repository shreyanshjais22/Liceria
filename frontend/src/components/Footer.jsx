import React from 'react';
import { assets } from "../assets/assets";
import { footerLinks } from "../assets/assets";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 mt-16">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pb-12 border-b border-blue-200/50">

                    {/* Company Info Section */}
                    <div className="flex-1 max-w-md">
                        <div className="mb-6">
                            <img
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="w-36 md:w-40 mb-4 hover:scale-105 transition-transform duration-300"
                                src={assets.logo}
                                alt="Company Logo"
                            />
                        </div>


                        <p className="text-gray-600 leading-relaxed mb-6 text-base">
                            Discover premium quality products at unbeatable prices. Your trusted partner for
                            exceptional shopping experiences and outstanding customer service.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700 mr-2">Follow us:</span>
                            <div className="flex gap-3">
                                <a href="#" className="group w-10 h-10 bg-orange-100 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="group w-10 h-10 bg-orange-100 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </a>
                                <a href="#" className="group w-10 h-10 bg-orange-100 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017-.001z" />
                                    </svg>
                                </a>
                                <a href="#" className="group w-10 h-10 bg-orange-100 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.077 2c2.158 0 2.415.009 3.263.047.787.036 1.204.166 1.486.275.314.122.538.268.772.501.234.234.38.458.501.772.11.282.24.699.275 1.486.038.848.047 1.105.047 3.263s-.009 2.415-.047 3.263c-.036.787-.166 1.204-.275 1.486-.122.314-.268.538-.501.772-.234.234-.458.38-.772.501-.282.11-.699.24-1.486.275-.848.038-1.105.047-3.263.047s-2.415-.009-3.263-.047c-.787-.036-1.204-.166-1.486-.275-.314-.122-.538-.268-.772-.501-.234-.234-.38-.458-.501-.772-.11-.282-.24-.699-.275-1.486-.038-.848-.047-1.105-.047-3.263s.009-2.415.047-3.263c.036-.787.166-1.204.275-1.486.122-.314.268-.538.501-.772.234-.234.458-.38.772-.501.282-.11.699-.24 1.486-.275.848-.038 1.105-.047 3.263-.047zM12.077 0C9.889 0 9.608.01 8.752.048c-.857.04-1.44.18-1.95.383-.529.206-.978.48-1.425.927-.447.447-.72.896-.927 1.425-.203.51-.343 1.093-.383 1.95C4.028 5.608 4.018 5.889 4.018 8.077v7.846c0 2.188.01 2.469.048 3.325.04.857.18 1.44.383 1.95.206.529.48.978.927 1.425.447.447.896.72 1.425.927.51.203 1.093.343 1.95.383.856.038 1.137.048 3.325.048h7.846c2.188 0 2.469-.01 3.325-.048.857-.04 1.44-.18 1.95-.383.529-.206.978-.48 1.425-.927.447-.447.72-.896.927-1.425.203-.51.343-1.093.383-1.95.038-.856.048-1.137.048-3.325V8.077c0-2.188-.01-2.469-.048-3.325-.04-.857-.18-1.44-.383-1.95-.206-.529-.48-.978-.927-1.425C18.458.728 18.009.454 17.48.248 16.97.045 16.387-.095 15.53-.135 14.674-.173 14.393-.183 12.205-.183H4.359C2.171-.183 1.89-.173 1.034-.135c-.857.04-1.44.18-1.95.383-.529.206-.978.48-1.425.927C-1.787 1.622-2.061 2.071-2.267 2.6c-.203.51-.343 1.093-.383 1.95-.038.856-.048 1.137-.048 3.325v7.846c0 2.188.01 2.469.048 3.325.04.857.18 1.44.383 1.95.206.529.48.978.927 1.425.447.447.896.72 1.425.927.51.203 1.093.343 1.95.383.856.038 1.137.048 3.325.048z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links Section */}
                    <div className="flex flex-wrap justify-between lg:justify-end w-full lg:w-auto gap-8 lg:gap-12">
                        {footerLinks.map((section, index) => (
                            <div key={index} className="min-w-[140px]">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 relative">
                                    {section.title}
                                    <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                className="text-gray-600 hover:text-orange-600 transition-all duration-300 
                                                         hover:translate-x-1 inline-block text-sm leading-relaxed
                                                         relative group"
                                            >
                                                {link.text}
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 
                                                               group-hover:w-full transition-all duration-300"></span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
                        <p>
                            Copyright {currentYear} ©
                            <a
                                href="#"
                                className="font-semibold text-orange-500 hover:text-orange-700 ml-1 
                                         hover:underline transition-colors duration-200"
                            >
                                Leceria
                            </a>
                            . All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-orange-600 transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-orange-600 transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-orange-600 transition-colors duration-200">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 
                         text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 
                         transition-all duration-300 z-50 flex items-center justify-center group"
                aria-label="Back to top"
            >
                <svg
                    className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;