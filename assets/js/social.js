var tweet_link = "www.seamustuohy.com"

//Grab text within selection
function getText() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();		
        html = sel;
	}
	else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function tweet_me() {
	window.open(tweet_link)
};

window.onmouseup = mouseup

function mouseup() {
    var text=getText();
	var tweet = "https://twitter.com/intent/tweet?"
	var cur_url = "&url="+encodeURI(document.URL)
	var via = "&via=seamustuohy"
    if (text!='') {
		tweeter = document.getElementById('tweet')
		if (tweeter.style.display == "none") {
			tweeter.style.display="block"
			tweet_link = tweet+"text="+text+cur_url+via
		}
		else {
			tweet_link = tweet+"text="+text+cur_url+via
		}
	};
};


