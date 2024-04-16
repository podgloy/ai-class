// /app/page.js

"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  async function note(event) {
    event.preventDefault();
    setIsLoading(true);


    const name = event.target.name.value;
    const career = event.target.career.value;
    const place = event.target.place.value;

    const response = await axios.post("/api/create-image", {
      name,
      career,
      place
    })
    console.log(response.data)
    setAnswer(response.data.answer)
    setIsLoading(false);

  }

  return (
    <div>
      <form onSubmit={note} className="flex flex-col">

        <input className="border-slate-500" type="text" name="name" placeholder="name" />

        <input className="border-slate-500" type="text" name="career" placeholder="your career" />

        <input className="border-slate-500" type="text" maxLength="20" name="place" placeholder="your place" />

        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Submit'}</button>

      </form>
      <p className="p-4">{isLoading ? 'Loading...' : ''}</p>
      <p className="p-4">{answer}</p>
    </div>
  );
}