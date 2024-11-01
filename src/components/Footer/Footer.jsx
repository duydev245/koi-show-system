import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t pt-5 bg-gray-100">

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-12 ">
                {/* ABOUT */}
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">About</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">How KoiKoi Works</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">News Page</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Sponsor</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Professional Opportunities</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Letter from the founder</a>
                        </li>
                    </ul>
                </div>
                {/* COMMUNITY */}
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Community</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Facebook</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Instagram</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Twitter</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Telegram</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Zalo</a>
                        </li>
                    </ul>
                </div>
                {/* Support */}
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Support</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">How to Support</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Support Center</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Contact Us</a>
                        </li>
                        <li>
                            <a href="/" target="blank" className="cursor-pointer hover:underline">Reliable and Safe</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-50 border-t z-0 bottom-0 w-full py-3 hidden md:block ">
                <div className="container mx-auto flex justify-between items-center text-gray-500 ">
                    <div>
                        <span className='pr-3'>© 2024 KoiKoi , Inc</span>.
                        <span className="px-3 hover:underline cursor-pointer">Privacy</span>.
                        <span className="px-3 hover:underline cursor-pointer">Terms</span>.
                        <span className="px-3 hover:underline cursor-pointer">Sitemap</span>
                    </div>
                    <div className="text-gray-700">
                        <span><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'inline-block', height: 16, width: 16, fill: 'currentcolor' }}><path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z" /></svg></span>
                        <span className="hover:underline cursor-pointer px-2 font-medium">English</span>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
