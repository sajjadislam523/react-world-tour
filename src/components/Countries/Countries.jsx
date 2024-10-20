import { useEffect, useState } from "react";
import Country from "./Country";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [visitedFlags, setVisitedFlags] = useState([]);

    const fetchCountries = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleVisitedCountries = (country) => {
        console.log("Added some countries");
        const newVisitedCountries = [...visitedCountries, country];
        setVisitedCountries(newVisitedCountries);
    };

    const handleVisitedFlags = (flags) => {
        setVisitedFlags([...visitedFlags, flags]);
    };

    return (
        <div className="container p-4 mx-auto">
            <h3 className="text-xl font-bold">Countries</h3>
            <h4>Visited Countries: {visitedCountries.length}</h4>
            {visitedCountries.map((country) => (
                <li key={country.cca2}>{country.name.common}</li>
            ))}

            <div className="flex items-center gap-4">
                {visitedFlags.map((flag, idx) => (
                    <img key={idx} className="my-4 w-14" src={flag} alt="" />
                ))}
            </div>

            {/* display countries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {countries.map((country) => (
                    <Country
                        key={country.cca2}
                        country={country}
                        handleVisitedCountries={handleVisitedCountries}
                        handleVisitedFlags={handleVisitedFlags}
                    />
                ))}
            </div>
        </div>
    );
};

export default Countries;
