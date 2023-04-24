 // Get the modal
 var modal = document.getElementById('newMemberModal');

 // Get the button that opens the modal
 const modalBtn = document.getElementById('modalButton');

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // Open Modal
 modalBtn.addEventListener('click', () => {
   modal.style.display = 'block';
 })

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
//  window.onclick = function (event) {
//    if (event.target == modal) {
//      console.log(event)
//      modal.style.display = "none";
//    }
//  }

/******
 * Add functionality for file input field
 * ******/
const input = document.querySelector("#photo")
const output = document.querySelector(".output")
let imagesArray = []

input.addEventListener("change", () => {
  const file = input.files
  console.log(file)
  console.log(file[0])
  
  if(imagesArray.length >= 1) {
    alert('Sorry, you can not add more than one image');
  } else {
    imagesArray.push(file[0])
  }
  displayImages()
})

function displayImages() {
  let images = ""
  imagesArray.forEach((image, index) => {
    console.log(image)
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="${image.name}">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`
  })
  output.innerHTML = images
}

function deleteImage(index) {
  imagesArray.splice(index, 1)
  displayImages()
}

/******
 * End functionality for file input field
 * ******/

/******
 * Add functionality for adding books to submit modal
 * *********/


/******
 * End functionality for adding books to submit modal
 * *********/

/******
 * Add functionality for borrowing books
 * *********/



/******
 * End functionality for for borrowing books
 * *********/