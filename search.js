const searchFormHandler = (value) => {
	if(value !== "") {
			getPosts(value).then(data => {
			console.log(data.response.docs)
			showResults(data.response.docs);
		});	
	}
	else {
		document.querySelectorAll('.search-result-wrapper').forEach(elem => {elem.style.display = "none";});
		console.log('Empty value');
	}
}

const getPosts = search => {
	return fetch('http://minsknews.test:8983/solr/posts_db/select?q=search:"' + search + '"&rows=20&sort=post_modified%20desc&wt=json')
	.then(response => response.json())
    .then(responseData => {return responseData})
    .catch(error => console.warn(error));
}

const createLink = (text, url) => {
	let newLink = document.createElement('a');
	newLink.setAttribute('href',url);
	newLink.className = 'search-results-item';
	newLink.appendChild(document.createTextNode(text));
	return newLink;
}

const showResults = posts => {
	let results = document.querySelectorAll('.search-result-wrapper');
	
	if(posts.length > 0) {
		results.forEach((elem) => {elem.innerHTML = '';});
		posts.forEach((elem) => {
	    	let result = createLink(elem.post_title, elem.post_name);
	    	
			results.forEach((elem) => {elem.appendChild(result);});
	    });
		results.forEach(elem => {
    		elem.style.display = "block";
    	});
	}
	else {
		results.forEach(elem => {
    		//elem.style.display = "none";
    		elem.innerText = "Ничего не найдено!";
    	});
		
	}
    
}

const createResultDiv = () => {
	let resultWrapper = document.createElement('div');
	let parent = document.querySelectorAll('.search');
	resultWrapper.setAttribute("class", "search-result-wrapper");
	[...parent].forEach((elem)=>{
		elem.append(resultWrapper);
	});
}

createResultDiv();
//console.log(getPosts('тест'));