function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);
}

function slug(input) {
	input = input.toLowerCase();
	input = input.replace(/ /g,"-");
	return input;
}

function toTitleCase(str) /* Invented by somebody on Stack Overflow */
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function unslug(input) {
	input = input.replace(/-/g, " ");
	input = toTitleCase(input);
	return input;
}

var tagOptions=["Hilarious","Good Read","Easy","David Foster Wallace","Not Worth It", "Inspiring"];

function addTags() {
	$('.browse-book').each(function() {
		var tagSelector = Math.floor(Math.random()*tagOptions.length);
		var tag = slug(tagOptions[tagSelector]);
		$(this).addClass(tag);
	});
	
}


function setUpPage() {
	addTags();
}

function sortResults() {

	$(".browse-book").each(function() {
		$(this).removeClass("hide-book");
	});
	
	//Get the contents of each label
	var activeFilters = [];
	
	$(".value").each(function( index ) {
		activeFilters[index] = $(this).text();
	});	
	
	//For each book, check each filter against all classes.
	//If any filter is not found as a class, flip a switch
	
	for (var i=0; i < activeFilters.length; i++) {
		var books = $(".browse-book");
		var filter = activeFilters[i];
		books.each(function() {
			if ($(this).hasClass(slug(filter))) {
				$(this).addClass("hide-book");
			}
		});
	}
	
	//Any switches that have been flipped, hide those elements
}

function progress() {
	var bar = $(".bar");
	var cont = $(".read-progress");
	var stat = cont.attr("data-progress");
	bar.css({
		"width" : stat+"%",
		"background-color" : "#7DCF6E",
		"padding" : ".5em",
		"color" : "#fff",
	});
	cont.css({
		"width" : "100%",
		"background-color" : "#eee",
		"padding" : "0",
		"margin" : "0",
	});
}

$(document).ready(function() {
	setUpPage();
	progress();	
	
	$(".typeahead").typeahead({
		source: tagOptions,
	});
	
	$(".add-tag").click(function(event) {
		event.preventDefault();
		var val = $(".typeahead").val();
		if (val != "") {
			var newTag = $("<span class='label label-inverse tag'><span class='value'>"+val+"</span> <a href='#' class='remove'>&times;</a></span>");
			$(".label-container").append(newTag);
			$(".typeahead").val("");
			sortResults();
		}
	});
	
	$(".label-container").on('click','a',function(event) {
		event.preventDefault();
		parent = $(this).parent();
		parent.remove();
		sortResults();
	});
	
	$(".search-bar").on('click','button',function(event) {
		if (!($(this).hasClass('no-redir'))) {
			window.location.href="catalog-results.html";
		}
	});
});

