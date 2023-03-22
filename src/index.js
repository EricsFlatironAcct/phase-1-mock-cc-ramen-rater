// write your code here
const ramenList=[]
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("http://localhost:3000/ramens")
    .then(resp=>resp.json())
    .then(obj=>{
        for (const ramenObj of obj) createRamen(ramenObj) //uses the createRamen function to add ramen to screen
    })
    .then(() => setRamen(ramenList[0]))

    //add form submit function
    const ramenForm = document.getElementById('new-ramen')
    ramenForm.addEventListener('submit', newRamen=>{
        newRamen.preventDefault();
        const ramenObj = {}
        ramenObj.id = ramenList.length
        for(item of ramenForm.elements){
            if(item.name.length>0) ramenObj[item.name]=item.value
        }
        if(ramenObj.rating>10)ramenObj.rating =10
        createRamen(ramenObj)
    })
})
//shows the selected ramen object on the main display
function setRamen(ramenObj){
    document.getElementById('ramen-detail').querySelector('img').src = ramenObj.image
    document.getElementById('ramen-detail').querySelector('h2').textContent = ramenObj.name
    document.getElementById('ramen-detail').querySelector('h3').textContent = ramenObj.restaurant
    document.getElementById('rating-display').textContent = `${ramenObj.rating} `
    document.getElementById('comment-display').textContent = `${ramenObj.comment}`
}

function createRamen(ramenObj){
    ramenList.push(ramenObj) //adds ramen to a list for selecting later
    //add image to the selectable list with a listener of 'click' to display that ramen
    const ramenThumb = document.createElement('img')
    ramenThumb.id = ramenObj.id
    ramenThumb.src = ramenObj.image
    ramenThumb.addEventListener('click', ()=>setRamen(ramenObj))
    document.getElementById('ramen-menu').append(ramenThumb)
}
/*
Core Deliverables
As a user, I can:
(complete)1. See all ramen images in the <div> with the id of #ramen-menu. When the page loads, request the data from the server to get all the ramen objects. 
Then, display the image for each of the ramen using an <img> tag inside the #ramen-menu div.
(complete)2. Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says 
insert comment here and insert rating here.
3. Create a new ramen after submitting the #new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; 
in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.
*/