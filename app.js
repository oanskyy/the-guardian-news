// 1. Add all the DOM selectors we need and store them into variables
const newsInput = document.querySelector(".news-input")
const form = document.querySelector("form")
const newsContainer = document.querySelector(".news-container")

// 2. Add eventListeners and functions
form.addEventListener("submit", e => {
	// we want to prevent the default behaviour of the form submission(reload page) but we dont want to reload the page we want to grab the DATA
	e.preventDefault()

	// Grab the VALUE of the search input
	let searchQuery = newsInput.value
	fetchNews(searchQuery)
})

async function fetchNews(searchQuery) {
	const apiKey = "13db6710-f397-43cd-b95c-d20460f95a2e"
	const response = await fetch(
		`https://content.guardianapis.com/search?q=${searchQuery}&api-key=${apiKey}`
	)
	const data = await response.json()

	newsResults(data.response.results)
}

function newsResults(results) {
	let fetchedNews = ""

	results.forEach(result => {
		let newsSection = result.sectionName
		let newsDate = result.webPublicationDate
		let newsURL = result.webUrl
		let newsTitle = result.webTitle

		fetchedNews += `
            <div class='news'>
                <p>${newsSection}</p>
                <p>${newsDate}</p>
                <a href=${newsURL} target='_blank'>${newsTitle}</a>
            </div>
        `

		newsContainer.innerHTML = fetchedNews
	})
}
