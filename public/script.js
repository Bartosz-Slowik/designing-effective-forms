let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            const countryElem = document.getElementById('country');
            countryElem.value = country;
            $(countryElem).trigger('change');
            console.log(country);
            getCountryCode();
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode() {
    const countryName = document.getElementById('country').value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {

            }
            return response.json();
        })
        .then(data => {
            const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
            console.log(countryCode)
            document.getElementById('countryCode').value = countryCode;

        })
        .catch(error => {
            console.log('Wystąpił błąd:', error);
        });
}

(async () => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);

    await fetchAndFillCountries();
    await getCountryByIP();
    // Get the country select element
    const countrySelect = document.getElementById('country');


    // Add a change event listener to the country select
    countrySelect.addEventListener('change', getCountryCode);
    const invoiceData = document.getElementById('invoiceData');
    let isInvoiceDataFilled = false; // Flag to check if data has been filled

    invoiceData.addEventListener('focus', function () {
        console.log("interacted!")
        if (!isInvoiceDataFilled) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('exampleInputEmail1').value;
            const city = document.getElementById('city').value;
            const zipCode = document.getElementById('zipCode').value;
            const street = document.getElementById('street').value;
            // Format the invoice data as needed
            invoiceData.value = `Imię: ${firstName}\nNazwisko: ${lastName}\nEmail: ${email}\nMiasto: ${city}\nKod pocztowy: ${zipCode}\nUlica: ${street}`;
            isInvoiceDataFilled = true; // Set the flag to true after filling data
        }
    });

})()
