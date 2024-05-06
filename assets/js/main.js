//sidebar function
function w3_open() {
	document.getElementById("sidebar").style.width = "10%";
    document.getElementById("sidebar").style.height = "50%";
	document.getElementById("sidebar").style.display = "block";
	// document.getElementById("openside").style.display = 'inline-block';

	// Calculate the height of the navbar
	var navbarHeight = document.getElementById("navbar").offsetHeight;
	// Set the top position of the sidebar to be just below the navbar
	document.getElementById("sidebar").style.top = navbarHeight + "px";
}

function w3_close() {
	document.getElementById("sidebar").style.display = "none";
	document.getElementById("openside").style.display = "inline-block";
}

//navbar sticky function
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sidebar = document.getElementById("sidebar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.scrollY >= sticky) {
	navbar.classList.add("sticky")
	sidebar.classList.add("sticky")
  } else {
	navbar.classList.remove("sticky");
	sidebar.classList.remove("sticky");
  }
}
//adjusting height
// Get all article elements
var articles = document.querySelectorAll('.posts article');

// Initialize max heights for each element
var maxHeaderHeight = 0;
var maxImageHeight = 0;
var maxParagraphHeight = 0;
var maxkeywordsHeight = 0;

// Loop through each article
articles.forEach(function(article) {
    // Get the height of the header in the current article
    var headerHeight = article.querySelector('#article_header').clientHeight;
    // Update maxHeaderHeight if necessary
    if (headerHeight > maxHeaderHeight) {
        maxHeaderHeight = headerHeight;
    }
    
    // Get the height of the image in the current article
    var imageHeight = article.querySelector('.image.fit').clientHeight;
    // Update maxImageHeight if necessary
    if (imageHeight > maxImageHeight) {
        maxImageHeight = imageHeight;
    }
    
    // Get the height of the paragraph in the current article
    var paragraphHeight = article.querySelector('p').clientHeight;
    // Update maxParagraphHeight if necessary
    if (paragraphHeight > maxParagraphHeight) {
        maxParagraphHeight = paragraphHeight;
    }

	var keywordsHeight = article.querySelector('ul.keywords').clientHeight;
    // Update maxParagraphHeight if necessary
    if (keywordsHeight > maxkeywordsHeight) {
        maxkeywordsHeight = keywordsHeight;
    }
});

// Set the height of the header, image, and paragraph in all articles to the maximum height
articles.forEach(function(article) {
    article.querySelector('#article_header').style.height = maxHeaderHeight + 'px';
    article.querySelector('.image.fit').style.height = maxImageHeight + 'px';
    article.querySelector('p').style.height = maxParagraphHeight + 'px';
	article.querySelector('ul.keywords').style.height = maxkeywordsHeight + 'px';
});


