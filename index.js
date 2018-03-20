let apiKey = "AIzaSyDUJBfylEWwXnFSkvVy0N_GFs0--Lbyrxo";

const Youtube_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: apiKey,
    q: `${searchTerm} in:name`,
    per_page: 5
  };
  $.getJSON(Youtube_SEARCH_URL, query, callback);
}

function renderResult(result) {
  window.result = result;
  return `
    
    <div>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}"><h1>${result.snippet.title}</h1>
      <img id="image" type="image" src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
    
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => 
       renderResult(item));
  $('.js-search-results').prop('hidden', false).html(results);
 // $('.js-search-results').append('<button id="nextButton">next</button><button id="previousButton">previous</button>');
  //$('#nextButton').click(event => {
  //  $('.js-search-results').empty();
  //  data.nextPageToken.items.map((item, index));
 // });
  //$('#previousButton').click(event => {
  //  $('.js-search-results').empty();
   // data.prevPageToken.items.map((item, index));
  //});  
}


function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
