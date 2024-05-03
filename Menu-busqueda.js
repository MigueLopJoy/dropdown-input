const d = document,
    $wrapper = d.querySelector(".wrapper"),
    $countriesList = d.querySelector(".countries-list"),
    $clicker = d.querySelector(".clicker"),
    $input = d.querySelector(".search-input input")
$selectedCountry = d.querySelector(".display-menu-btn p");

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

let filteredList = countries,
    selected = 0;

const createCountriesList = (arr) => {
    let $li = "";
    arr.forEach(country => {
        $li += `<li>${country}</li>`;
    });
    $countriesList.innerHTML = $li;
};
createCountriesList(countries);

const filterList = () => {
    filteredList = countries.filter(country => {
        return country.toLowerCase().startsWith(($input.value).toLowerCase());
    });
    createCountriesList(filteredList);
};

filteredList.forEach(country => {
    d.addEventListener("click", e => {
        if (country === e.target.textContent) {
            $input.value = country;
            filterList();
        };
    })

    d.addEventListener("keyup", e => {
        if ($countriesList.querySelector(".selected") && e.key === "Enter") {
            if (country === $countriesList.querySelector(".selected").textContent) {
                $input.value = country;
                filterList();
            };
        }
    });
});

d.addEventListener("click", e => {
    if (e.target === $clicker) {
        $wrapper.classList.toggle("active");
        $input.focus();
        selected = 0;
        $input.value = "";
        filteredList = countries;
        createCountriesList(filteredList);
    };
});

d.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        if (filteredList.indexOf($input.value) >= 0) {
            $wrapper.classList.toggle("active");
            $selectedCountry.textContent = $input.value;
            selected = 0;
            $input.value = "";
            filteredList = countries;
            createCountriesList(filteredList);
        }
    } else if (e.key === "ArrowDown" && d.activeElement === $input) {
        if ($countriesList.querySelector(".selected")) {
            let $selectedCountry = $countriesList.querySelector(".selected");
            console.log($selectedCountry.offsetTop + 86);
            if (($selectedCountry.offsetTop + 86) > 240) {
                let toScroll = $selectedCountry.offsetTop + 86 - 240;
                $countriesList.parentElement.scroll(0, toScroll);
            };
            $countriesList.querySelector(".selected").classList.remove("selected");
        };
        $countriesList.children[selected].classList.add("selected");
        selected++;
    } else if (e.key === "ArrowUp" && d.activeElement === $input) {
        console.log($countriesList.offsetTop);
        if (selected > 1) {
            if ($countriesList.querySelector(".selected")) {
                let $selectedCountry = $countriesList.querySelector(".selected");
                if (($selectedCountry.offsetTop + 86) > 240) {
                    let toScroll = $selectedCountry.offsetTop - 240;
                    $countriesList.parentElement.scroll(0, toScroll);
                };
                $countriesList.querySelector(".selected").classList.remove("selected");
            };
            selected--;
            $countriesList.children[selected - 1].classList.add("selected");
        };
    } else {
        filterList();
    };
});
