const searchBtn = document.getElementById('search-btn');
let SearchMovie = document.getElementById('search-box');
const movie_List = document.getElementById('movie-list');



const apiKey = "pub_37fba750d24f450fb5d68d676b493633";


const getmovies = async()=>{
    const movieName = SearchMovie.value.trim(); 
    console.log(movieName)
    if (!movieName) {
        alert("Please enter a movie name!");
        return;
    }
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${movieName}`;

    try{
        movie_List.innerHTML ='<h1>Loading....</h1>';
        const response = await fetch(apiUrl);
        const data = await response.json();
         if (data.Response === "False") {
      movie_List.innerHTML = "<h1>Movie not found!</h1>";
      return;
    }
        console.log(data);
        data.results.forEach(item => {
  if (item.language === "english") {
          movie_List.innerHTML = `
  <div class="movie-card">
 
    <img style="height:350px, width:300px"src="${item.image_url}" alt="${item.title}">
    <div class="movie-info">
      <h2>${item.title}</h2>
      <p><strong>description:</strong> ${item.description}</p>
      <p><strong>content:</strong> ${item.content}</p>
      <p><strong>country:</strong> ${item.country}</p>
      <p><strong>creator:</strong> ${item.creator}</p>
    </div>
  </div>
`; }
});

SearchMovie.value="";
     
    }
    catch(error){
         movie_List.innerText = "An error happened, try again later.";
        console.log(error);
    }
    

}
// getmovies();

searchBtn.addEventListener("click", getmovies);
