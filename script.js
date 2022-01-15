const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;


//random quote function
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    //fetching random quotes/data from the API and parsing it into JavaScript object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result=>{
        quoteText.innerText= result.content;
        authorName.innerText=result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText="New Quote";
    });
}
speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click",()=>{
    //copying the quote text on copyBtn click
    //writeText() propertywrites the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText);
});
twitterBtn.addEventListener("click",()=>{
    let tweetUrl= `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl,"_blank");
});
quoteBtn.addEventListener("click", randomQuote);



