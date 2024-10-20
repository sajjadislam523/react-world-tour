import PropTypes from "prop-types";
import { useState } from "react";

const Country = ({ country, handleVisitedCountries, handleVisitedFlags }) => {
    const {
        name = {},
        nativeName = {},
        capital = [],
        region = "Unknown",
        subregion = "Unknown",
        area = "Unknown",
        population = "Unknown",
        flags,
        cca3,
    } = country;

    const [visited, setVisited] = useState(false);

    const defineVisit = () => {
        setVisited(!visited);
    };

    const getNativeNameWithLang = () => {
        const firstLanguageKey = Object.keys(nativeName)[0];

        if (firstLanguageKey && nativeName[firstLanguageKey]) {
            const nativeLang = nativeName[firstLanguageKey];
            return {
                officialName: nativeLang.Official || "Native name Unavailable",
                commonName: nativeName.common || "Native name Unavailable",
                langCode: firstLanguageKey,
            };
        }

        return {
            officialName: "Native Name Unavailable",
            commonName: "",
            langCode: "en",
        };
    };

    const nativeNameInfo = getNativeNameWithLang();

    return (
        <div
            className={`p-4 m-4 text-white ${
                visited === true
                    ? "bg-white !text-black"
                    : "text-white bg-black"
            } border-2 border-blue-400 rounded-lg`}
        >
            {/* Fallback for name.common */}
            <h1 className="text-lg font-bold">
                Name: {name.common || "Unknown"}
            </h1>

            {/* Handle missing official or nativeName fields */}
            <p>{name.official || "Unknown"}</p>
            <p>
                Native Common Name:
                <span lang={nativeNameInfo.langCode}>
                    {nativeNameInfo.commonName}
                </span>
            </p>

            {/* Handle missing capital */}
            <p>Capital: {capital.length > 0 ? capital[0] : "Unknown"}</p>

            {/* Handle missing fields for region, subregion, area, population */}
            <p>Region: {region}</p>
            <p>Subregion: {subregion}</p>
            <p>Area: {area} km²</p>
            <p>Population: {population}</p>
            <p>Code: {cca3}</p>
            <img
                className="w-1/2 my-4 border-2 border-black"
                src={flags.png}
                alt=""
            />
            <div className="flex flex-col items-start">
                <button
                    className="px-4 py-2 m-4 font-bold text-white bg-purple-500 rounded-lg"
                    onClick={defineVisit}
                >
                    Visited?
                </button>

                <button
                    className="px-4 py-2 m-4 font-bold text-white bg-purple-500 rounded-lg"
                    onClick={() => handleVisitedCountries(country)}
                >
                    Add to visited
                </button>
                <button onClick={() => handleVisitedFlags(country.flags.png)}>
                    Add visited flags
                </button>
            </div>
        </div>
    );
};

// Add PropTypes validation
Country.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.shape({
            common: PropTypes.string,
            official: PropTypes.string,
        }),
        nativeName: PropTypes.object,
        capital: PropTypes.arrayOf(PropTypes.string),
        region: PropTypes.string,
        subregion: PropTypes.string,
        area: PropTypes.number,
        population: PropTypes.number,
        flags: PropTypes.image,
        cca3: PropTypes.string,
    }).isRequired,
};

export default Country;
