'use client'
import Percentage from '@/public/images/percentage.png';
import ComingSoon from '@/public/images/COMING SOOOOON....png';
import { useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mail) {
      setMessage("Please enter a valid mail.");
      return;
    }

    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_AIRTABLE_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await axios.post(
        API_URL ?? '',
        {
          records: [
            {
              fields: {
                mail: mail,
                date: currentDate,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Successfully joined the waitlist!");
        setMail("");
      }
    } catch (error) {
      console.error("Error submitting mail:", error);
      setMessage("There was an error submitting your mail. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative grow flex h-screen justify-between py-14 snap-center gap-16  flex-col items-center overflow-hidden bg-no-repeat bg-cover bg-background-image bg-center">
      <img src={Percentage.src} alt="Percentage" className="w-[5.4rem] h-[5.4rem] aspect-square" />
      <div className='flex flex-col gap-2'>
        <div className=" font-cczoinks md:text-[3.4rem] text-center text-[#FED501] max-md:mt-10 md:w-auto max-w-full text-4xl">
          Feel that nostalgia onchain!!
        </div>
        <div className="font-chathura md:text-6xl font-bold text-center text-[#FED501] text-4xl">
          JOIN THE WAITLIST NOW
        </div>
        <form onSubmit={handleSubmit} className='w-full relative flex justify-center'>
          <input value={mail}
            onChange={handleMailChange} type="text" placeholder="your email" className="z-[1] sm:w-full  h-[4.4rem] rounded-lg border-2 border-black text-black px-6 font-chathura text-[2.48rem]" />
          <div className='w-7 h-7 absolute bottom-[-0.6rem] border-b-4 left-2/3 z-10 bg-white  border-black rounded-full'></div>
          <div className='w-4 h-4 absolute -bottom-8   border-2 left-[66.167%] z-10 bg-white  border-black rounded-full'></div>
          <div className='w-2 h-2 absolute -bottom-11   border-2 left-[66%] z-10 bg-white  border-black rounded-full'></div>

        </form>
            {message && <p className="mt-2 text-center text-sm font-medium mr-8 text-[#FED501]">{message}</p>}

        <button className='key-button mt-9 -translate-x-3 text-black mx-auto flex justify-center items-center font-extrabold font-chathura text-[2.48rem] bg-[#FED501] h-10  sm:h-14'>JOIN WAITLIST</button>
      </div>
      <div className="  w-full flex justify-center items-center">
        <img src={ComingSoon.src} alt="Coming Soon" className="sm:w-[20.4rem] w-[15.2rem] h-[2.7rem] sm:h-[3.4rem]" />
      </div>
    </div>
  );
}
