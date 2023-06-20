const apiKey = "AIzaSyACIceXzt7CaY0-ke6hUNNdUd8SbprAwEs";

let searchInput = document.getElementById("search-input");

function searchVideos(){

    console.log(searchInput.value);
    document.getElementById('container').innerHTML="";
    fetchVideo(searchInput.value);
    
}

async function fetchVideo(searchInput){
    
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchInput}&key=${apiKey}`
    

    try{
        let response = await fetch(url);
        let result = await response.json();
        // console.log(result);
        printThumbnail(result.items)
    }
    catch(error){
        console.log(error);
    }
        // response.json();

}

async function printThumbnail(items){
    for(let i =0 ; i< items.length ; i++){
        
        let videoId = items[i].id.videoId;
        let statsUrl=`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`

        let channelTitle = items[i].snippet.channelTitle;
        let viewCount ;
        try{

            let response = await fetch(statsUrl);
            let result = await response.json();
           viewCount = result.items[0].statistics.viewCount;
        //    console.log(result);
        }catch(error){
            console.log("error found");
            viewCount="not a video"
        }


       let imageUrl =  items[i].snippet.thumbnails.high.url;
       let title = items[i].snippet.title;

   

       let card = document.createElement('div');
       card.className='card'
       card.id= videoId;
       let num =nFormatter(Number(viewCount));
       card.innerHTML=`<img id="image" src="${imageUrl}" alt="">
       <p id="title">${title}</p>
       <p id="channelTitle">${channelTitle}</p>
       <p id="viewCount">${num}</p>`

       document.getElementById('container').appendChild(card);

    }
}
function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}


function playVideo(){
    // let container = document.getElementsByClassName('card');
    let container = document.getElementById('container');
  
    // let cards = container.childNodes;
    // console.log(container);
    container.addEventListener('click',(e)=>{
        playVideoId = e.target.parentNode.id;
        let card = document.getElementById(playVideoId);
        // let cardHtml = card.innerHTML;

        // console.log(e.target.parentNode.id);
        container.innerHTML=`<iframe id="yt-player" width="720" height="400" src="https://www.youtube.com/embed/${playVideoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer ; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `
        
    })
    // cards.forEach(element => {
    //     element.addEventListner('click',(e)=>{
    //         console.log(e);
    //     })
    // });
}

playVideo();

// let searchBtn = document.getElementById("search-btn");
// searchBtn.addEventListener('click',playVideo());