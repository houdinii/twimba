import {tweetsData} from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")
const feed = document.getElementById("feed")


tweetBtn.addEventListener("click", ()=>{
  console.log(tweetInput.value)
})


document.addEventListener("click", (e)=>{
  if(e.target.dataset.like){
    boldLikeIcon(e.target.dataset.like)
    handleLikeClick(e.target.dataset.like)
  }
  else if(e.target.dataset.reply){
    handleReplyClick(e.target.dataset.reply)
  }
  else if(e.target.dataset.retweet){
    handleRetweetClick(e.target.dataset.retweet)
  }
})

function boldLikeIcon(uuid){
  let el = document.querySelector(`[data-like='${uuid}']`)
  el.classList.toggle('fa-bold')
}

function handleLikeClick(tweetId){
  const targetTweetObject = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]

  if(targetTweetObject.isLiked){
    targetTweetObject.likes--
  } else {
    targetTweetObject.likes++
  }

  targetTweetObject.isLiked = !targetTweetObject.isLiked
  render()
}

function handleReplyClick(tweetId){
  const targetTweetObject = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]
  if(targetTweetObject.replies.length > 0){
    // get element and then toggle it's class
    let el = document.getElementById(`replies-${tweetId}`)
    el.classList.toggle('hidden')
  }
}

function handleRetweetClick(tweetId){
  const targetTweetObject = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]

  if(targetTweetObject.isRetweeted){
    targetTweetObject.retweets--
  } else {
    targetTweetObject.retweets++
  }

  targetTweetObject.isRetweeted = !targetTweetObject.isRetweeted
  render()
}

function getFeedHtml(tweets){
  let feedHtml = ""

  tweets.forEach((tweet)=>{
    let likeClass = ''
    let retweetClass = ''

    if(tweet.isLiked) {
      likeClass = "fa-bold"
    }

    if(tweet.isRetweeted) {
      retweetClass = "fa-bold"
    }

    let repliesHtml = ''

    if(tweet.replies.length
    ){
      console.log(tweet.uuid)
      for (let reply of tweet.replies) {
        repliesHtml += `
          <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic" alt="profile pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
            </div>
          </div>`
      }
    }

    feedHtml += `
    <div class="tweet">
      <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic" alt="profile picture">
        <div>
          <p class="handle">${tweet.handle}</p>
          <p class="tweet-text">${tweet.tweetText}</p>
          <div class="tweet-details">
            <span class="tweet-detail">
               <i data-reply="${tweet.uuid}" class="fa-regular fa-comment-dots"></i> ${tweet.replies.length}
            </span>
            <span class="tweet-detail">
              <i data-like="${tweet.uuid}" class="${likeClass} fa-solid fa-heart"></i> ${tweet.likes} 
            </span>
            <span class="tweet-detail">
                <i data-retweet="${tweet.uuid}" class="${retweetClass} fa-solid fa-retweet"></i> ${tweet.retweets}
            </span>
          </div>
        </div>
      </div>
      <div id="replies-${tweet.uuid}" class="hidden">
        ${repliesHtml}
      </div>
    </div>
    `
  })
  return feedHtml
}

function render(){
  feed.innerHTML = getFeedHtml(tweetsData)
}

render()