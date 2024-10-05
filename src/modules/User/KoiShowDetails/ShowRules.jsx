import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const ShowRules = ({ closeForm, awardDate }) => {
    const [dropdownRule, setDropdownRule] = useState(false);

    const toggleRule = () => {
        setDropdownRule(!dropdownRule);
    };

    return (
        <>
            {/* btn toggle menu rule */}
            <button
                className='bg-gray-100 border w-4/5 mx-auto flex justify-center p-4 rounded duration-300 hover:shadow-lg mb-8'
                onClick={toggleRule}
            >
                <div className='text-2xl font-bold'>
                    <FontAwesomeIcon icon={dropdownRule ? (faMinus) : (faPlus)} />
                    <span className='ms-2'>Official Koi Show Rules</span>
                </div>
            </button>

            {/* menu rule */}
            <div className={`${dropdownRule ? 'block animate__animated animate__fadeInDown' : 'hidden'} p-10 bg-gray-100 border rounded duration-300 hover:shadow-lg mb-8`}>
                {/* Rules & Regulations: */}
                <div className='mb-8'>
                    <h4 className='text-4xl font-bold mb-5'>Rules & Regulations:</h4>
                    <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                        <li>Entry fee is $5/Koi. We welcome donations.</li>
                        <li>Our team will upload your entry for a $10/Koi fee.</li>
                        <li>This Koi show is open to all Koi lovers including hobbyists and dealers.</li>
                        <li>The entrants must be from America (North, Central, and South America) to win awards.</li>
                        <li>All Koi must be entered by a personal name, not a business name.</li>
                        <li>All entered Koi must be owned by the entrant at the time of registration and the award ceremony.</li>
                        <li>All submitted images and information must be owned by the entrant.</li>
                        <li>The images and videos should only show Koi as much as possible.</li>
                        <li>The submitted information should not contain any details of breeders or dealers, or anything the organizer deems could affect the judging.</li>
                        <li>Every entry must be pre-approved by the organizer for acceptance of registration.</li>
                        <li>The organizer reserves the right to reconfirm and/or correct entry information without contacting entrants.</li>
                        <li>Once published, replacement of images or videos is not allowed.</li>
                        <li>By participating, entrants agree that the organizer may use all images or information from entries, comments, or ratings for marketing purposes.</li>
                    </ul>

                </div>

                {/* Entering Koi In Show */}
                <div className='mb-8'>
                    <h4 className='text-4xl font-bold mb-5'>Entering Koi In Show:</h4>
                    <h4 className='text-xl font-semibold mb-5'>Please review and submit the necessary information with the form online:</h4>
                    <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                        <li>
                            <span className='font-semibold'>Koi Name - </span>
                            Does your koi have a name? Put a title for what we should refer to your koi as.
                        </li>
                        <li>
                            <span className='font-semibold'>Koi Description - </span>
                            Write a description about this koi. Tell a story, its history, how its pattern changed. It's your canvas!
                        </li>
                        <li>
                            <span className='font-semibold'>Approximate Size and Size category - </span>
                            It is an honor system. Please provide as accurate or best estimate information as possible.
                        </li>
                        <li>
                            <span className='font-semibold'>Variety & Category - </span>
                            The information will be double checked by the organizer.
                        </li>
                        <li>
                            <span className='font-semibold'>Koi Picture(s) - </span>
                            Vertical photo preferred and larger photos are recommended. JPG or PNG files accepted. Minimum size: width 320px x height 500px. Up to 3 images allowed.
                        </li>
                        <li>
                            <span className='font-semibold'>Koi Video - </span>
                            (up to 60 seconds) link YouTube (Horizontal video is recommended.)
                        </li>
                        <li className='font-semibold'>Koi picture and video must be taken before <span className='font-bold text-red-600'>{closeForm}.</span></li>
                        <li>
                            <span className='font-semibold'>Name, Email, Phone Number - </span>
                            Enter the information to contact you about where to send your award if you win.
                        </li>
                    </ul>

                </div>

                {/* Koi Show Categories */}
                <div className='mb-8'>
                    <h4 className='text-4xl font-bold mb-5'>Koi Show Categories:</h4>
                    <div className='grid grid-cols-1 lg:flex'>
                        {/* Variety Categories */}
                        <div className='basis-6/12'>
                            <h4 className='text-xl font-semibold mb-5'>Variety Categories:</h4>
                            <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                                <li>Kohaku</li>
                                <li>Taisho Sanke</li>
                                <li>Showa</li>
                                <li>Utsurimono</li>
                                <li>Asagi & Shusui</li>
                                <li>Koromo & Goshiki</li>
                                <li>Kawarimono (including Bekko, Muji)</li>
                                <li>Hikarimono (Hikarimoyo / HikariUtsuri / Hikari Muji)</li>
                                <li>Tancho</li>
                                <li>KinGinrin</li>
                                <li>
                                    *No Doitsu Hirenaga butterfly category. They will go under each variety category.
                                </li>
                            </ul>

                        </div>
                        {/* Size Categories */}
                        <div className='basis-6/12'>
                            <h4 className='text-xl font-semibold mb-5'>Size Categories:</h4>
                            <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                                <li>Size 1 - Under 10"</li>
                                <li>Size 2 - 10 - 16"</li>
                                <li>Size 3 - 16 - 22"</li>
                                <li>Size 4 - 22 - 28"</li>
                                <li>Size 5 - 28” +</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Awards */}
                <div className='mb-8'>
                    <h4 className='text-4xl font-bold mb-5'>Awards:</h4>
                    <h4 className='text-xl font-semibold mb-5'>Awards will be announced during virtual award ceremony after <span className='font-bold text-red-600'>{awardDate}!</span></h4>
                    <div className='text-lg  mb-5'>
                        <p className='mb-5'>No Koi can win more than one award, except for special awards.</p>
                        <p>* Delivery of the prizes - FREE delivery to a winner in the U.S.A. Winners from outside US must pay the shipping. Please note some countries may not allow import of prize items such as koi food. In such cases, no compensation will be provided.</p>
                    </div>

                    <div className='grid grid-cols-1 lg:flex'>
                        {/* Major Trophies */}
                        <div className='basis-4/12'>
                            <h4 className='text-xl font-semibold mb-5'>Major Trophies:</h4>
                            <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                                <li>Grand champion</li>
                                <li>Reserve Grand champion</li>
                                <li>Mature champion or Best in Size 4</li>
                                <li>Adult champion or Best in Size 3</li>
                                <li>Young champion or Best in Size 2</li>
                                <li>Baby champion or Best in Size 1</li>
                                <li>Sakura champion (non Gosanke)</li>
                            </ul>
                        </div>

                        {/* Best in Sizes */}
                        <div className='basis-4/12'>
                            <h4 className='text-xl font-semibold mb-5'>Best in Sizes:</h4>
                            <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                                <li>Size 1 - Under 10"</li>
                                <li>Size 2 - 10 - 16"</li>
                                <li>Size 3 - 16 - 22"</li>
                                <li>Size 4 - 22 - 28"</li>
                                <li>Size 5 - 28” +</li>
                            </ul>
                        </div>

                        {/* Best in Varieties */}
                        <div className='basis-4/12'>
                            <h4 className='text-xl font-semibold mb-5'>Best in Varieties:</h4>
                            <ul className='ms-5 text-lg' style={{ listStyleType: 'disc' }}>
                                <li>Kohaku</li>
                                <li>Taisho Sanke</li>
                                <li>Showa</li>
                                <li>Utsurimono</li>
                                <li>Asagi & Shusui</li>
                                <li>Koromo & Goshiki</li>
                                <li>OTHER - Kawarimono (including Bekko, Muji)</li>
                                <li>Hikarimono (Hikarimoyo / HikariUtsuri / Hikari Muji)</li>
                                <li>Tancho</li>
                                <li>KinGinrin</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ShowRules