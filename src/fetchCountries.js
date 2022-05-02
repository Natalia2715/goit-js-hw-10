function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/{name}`)
        .then(
        response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
            })
   
}