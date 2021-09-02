// error 
const errorMessage = document.getElementById('error');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('length-books').style.display = displayStyle;
}
const loadBook = () => {
    const searchField = document.getElementById('search-field');

    // display spinner

    const searchText = searchField.value;
    // clear Data
    searchField.value = '';
    toggleSpinner('block');
    toggleSearchResult('none');

    if (searchText === '') {

        errorMessage.innerHTML = `<h2>Search area cannot be empty</h2>`;
    }
    else {
        errorMessage.innerText = ``
    }

    // load book api for searching
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => bookDetails(data.docs))
}

const bookDetails = details => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (details.length === 0) {
        errorMessage.innerHTML = `<h2>Sorry!! No Books Found</h2>`;
    }
    else {
        errorMessage.innerText = ``;
    }

    details.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                         <img height="400px" width="100%" src="https://covers.openlibrary.org/b/id/${detail.cover_i}-M.jpg" class="card-img-top" alt="...">
                            <div class="card-body border border-black">
                                <h3 class='text-white'>Title: ${detail.title.slice(0, 15)}</h3>
                                <h5 class="card-title text-danger mb-4 fst-italic">Author-Name: ${detail.author_name}</h5>
                                <h6 class='fw-bold text-white'>First Publish Year: ${detail.first_publish_year}</h6>
                                <p class="text-secondary fst-italic">Many of the best coding books are used by universities and professional developers to improve their skills. If you’re learning how to code on your own.</p>
                            </div>
            `;
        searchResult.appendChild(div);
    })
    toggleSpinner('none');
    toggleSearchResult('block');

}