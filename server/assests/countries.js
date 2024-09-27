const capitalToCountryMap = {
    "Funafuti": "Tuvalu",
    "Dili": "Timor-Leste",
    "Juba": "South Sudan",
    "Ljubljana": "Slovenia",
    "Bratislava": "Slovakia",
    "São Tomé": "São Tomé and Príncipe",
    "Vilnius": "Lithuania",
    "Vaduz": "Liechtenstein",
    "Riga": "Latvia",
    "Tarawa": "Kiribati",
    "Bissau": "Guinea-Bissau",
    "Malabo": "Equatorial Guinea",
    "Prague": "Czechia",
    "Zagreb": "Croatia",
    "Yaoundé": "Cameroon",
    "Gitega": "Burundi",
    "Sarajevo": "Bosnia and Herzegovina",
  };
  
  // Export capitalToCountryMap
  module.exports.capitalToCountryMap = capitalToCountryMap;
  
  // Create countryToCapitalMap using capitalToCountryMap
  module.exports.countryToCapitalMap = Object.fromEntries(
    Object.entries(capitalToCountryMap).map(([capital, country]) => [country, capital])
  );
  
  // Updated countries array with specific countries replaced by their capitals
  module.exports.countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Caribbean", "Argentina", 
    "Armenia", "Australia", "Austria", "Azerbaijan", "Caribbean", "Bahrain", "Bangladesh", 
    "Caribbean", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Sarajevo", // Bosnia and Herzegovina
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Gitega", // Burundi
    "Cabo Verde", "Cambodia", "Yaoundé", // Cameroon
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo", "Costa Rica", "Zagreb", // Croatia
    "Cuba", "Cyprus", "Prague", // Czechia
    "Denmark", "Djibouti", "Caribbean", "Ecuador", "Egypt", "El Salvador", 
    "Malabo", // Equatorial Guinea
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Caribbean", 
    "Guatemala", "Guinea", "Bissau", // Guinea-Bissau
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", 
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", 
    "Jordan", "Kazakhstan", "Kenya", "Korea", "Tarawa", // Kiribati
    "Kuwait", "Kyrgyzstan", "Laos", "Riga", // Latvia
    "Lebanon", "Lesotho", "Liberia", "Libya", "Vaduz", // Liechtenstein
    "Vilnius", // Lithuania
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", 
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
    "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Saudi Arabia", "Senegal", 
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Bratislava", // Slovakia
    "Ljubljana", // Slovenia
    "Solomon Islands", "Somalia", "South Africa", "Juba", // South Sudan
    "Spain", "Sri Lanka", "Sudan", "Suriname", 
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
    "Dili", // Timor-Leste
    "Togo", "Tonga", "Caribbean", "Tunisia", "Turkey", "Turkmenistan", 
    "Funafuti", // Tuvalu
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "USA", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
    "Zambia", "Zimbabwe"
  ];