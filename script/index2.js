import { auto_complete } from "./autocomplete";
/*******
 * 
 *  Read about optional chaining
 * 
 * https://bobbyhadz.com/blog/javascript-cannot-read-property-addeventlistener-null
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 * https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
 * 
 * https://alertifyjs.com/
 * 
 * https://sweetalert2.github.io/#declarative-templates
 * 
 * ********/
// alertify.alert('Ready!');



const onClick = (event) => {
  // console.log(event);

  if (event.target.classList[2] === 'modal_btns') {
    const elt = event.srcElement.id;
    // console.log(elt);

    let modality = document.getElementById(elt + '_modal');

    modality.style.display = 'block';
    modality.classList.add('show_modal');
  }

  if (event.target.className === 'close') {
    let active_modal = document.querySelector('.show_modal');

    active_modal.style.display = 'none';
    active_modal.classList.remove('show_modal');
    //     active_modal.classList.add('hide_modal');

  }
}

window.addEventListener('click', onClick);

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

input?.addEventListener("change", () => {
  const file = input.files
  console.log(file)
  console.log(file[0])

  if (imagesArray.length >= 1) {
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

const selectedBooksArr = [];
const booksDetailsDiv = document.getElementsByClassName('books_details');
const returnBtn = document.getElementsByClassName('return_btn_pill')
const return_books_btn = document.getElementById('return_book');
const books_to_return_wrap = document.getElementById('books_to_return_wrap');

function selectBook(event) {
  const book_obj = {} // Create book obkect to record each book detail to be added to the return modal
  // alert(1)
  const parentEle = this.parentElement; // The element that was clicked parent
  parentEle.classList.toggle('selectedBook');
  if (parentEle.classList.contains('selectedBook')) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    book_obj.nameOfBook = parentEle.dataset.bookTitle
    book_obj.idOfBook = parentEle.dataset.id;
    selectedBooksArr.push(book_obj)
    loopSubmitArr();
    promptModals(`Added "${parentEle.dataset.bookTitle} (${parentEle.dataset.id})"`, 'success')
    console.log(selectedBooksArr)
  } else {
    const parentId = parentEle.dataset.id
    selectedBooksArr.forEach((element, index) => {
      if (parentId) {
        if (parentId === element.idOfBook) {
          // console.log(`Found ${element.idOfBook} it at ${index}`)
          selectedBooksArr.splice(index, 1);
          console.log('Removed element')
          loopSubmitArr();
          promptModals(`Removed "${element.nameOfBook} (${element.idOfBook})"`, 'error')
        }
      } else {
        return;
      }
    })
    console.log(selectedBooksArr)
    console.log('Removed Class')
  }
  // booksDetailsDiv.classList.add()
}

for (let i = 0; i < returnBtn.length; i++) {
  returnBtn[i].addEventListener("click", selectBook);
}

function loopSubmitArr() {
  books_to_return_wrap.innerHTML = "";
  selectedBooksArr.forEach((book) => {
    books_to_return_wrap.innerHTML += `
      <div class="wrapper">
          <div class="confirm_bk_name">${book.idOfBook}</div>
          <div class="confirm_id">${book.nameOfBook}</div>
          <div class="del_bk_btn" onClick=removeBook()>Remove</div>
      </div>
    `
  })
}

/******
 * End functionality for adding books to submit modal
 * *********/

function promptModals(msg, type) {
  alertify.notify(`${msg}`, `${type}`, 5, function () { console.log('dismissed'); });
  alertify.set('notifier','position', 'top-right');
  // alertify.success('Current position : ' + alertify.get('notifier','position'));
}

/******
 * Add functionality for removing books from return modal
 * *********/
function removeBook() {
  console.log('clicled')
}
/******
 * End functionality for removing books from return modal
 * *********/

/******
 * Add functionality for adding borrowing books fields
 * *********/

const borrow_book_form = document.getElementById('borrow_book_form');
const add_book_btn = document.getElementById('add_book');
const first_form_group = document.getElementById('first-form-group');

const addBookGroup = () => {

  const max_fields = 10;
  let field = 1

  if (field < max_fields) {
    field++;

    const div = document.createElement('div');
    const bk_name_input = document.createElement('input');

    const suggestions = document.createElement('div');
    const bk_date_input = document.createElement('input');
    const del_btn = document.createElement('span');

    div.setAttribute('class', 'form-group');

    bk_name_input.setAttribute('id', 'book_name_' + field);
    bk_name_input.setAttribute('class', 'autocomplete');
    bk_name_input.setAttribute('type', 'text');
    bk_name_input.setAttribute('name', 'book_name_' + field);
    bk_name_input.setAttribute('placeholder', 'Start Typing Book shelf id or title ...');
    // bk_name_input.addEventListener('input', auto_complete);

    suggestions.setAttribute('class', 'suggestions');

    // bk_date_input.setAttribute('id', 'return_date_' + field);
    // bk_date_input.setAttribute('type', 'date');
    // bk_date_input.setAttribute('name', 'return_date_' + field);
    // bk_date_input.setAttribute('placeholder', 'Return Date');

    del_btn.innerHTML = "x";
    // bk_date_input.addEventListener('input', auto_complete);

    del_btn.setAttribute('class', 'delete_book_btn')


    div.append(bk_name_input);
    div.append(suggestions);
    // div.append(bk_date_input);
    div.append(del_btn);

    //  borrow_book_form.prepend(div);

    first_form_group.insertAdjacentElement("beforeend", div)

    //borrow_book_form.append('<div class="form-group"><input id="book_name" type="text" name="book_name" placeholder="Book Name"><input id="return_date" type="date" name="return_date" placeholder="Age"><span class="delete_book_btn">x</span></div>');
    console.log(1234)
  }
}

// function alertMe() {
//   alert('I am alertified');
// }

add_book_btn?.addEventListener('click', addBookGroup);

// const autocompleteInputs = document.getElementsByClassName('autocomplete');
// const inputCollections = Array.from(autocompleteInputs);
// inputCollections.forEach(auto_complete);


/******
 * End functionality for adding borrowing books fields
 * *********/

/****
 *  Start functionality for Dashboard Borrowed Books
 * ****/

const action_btn = document.getElementsByClassName('action');
const book_detail_modal = document.getElementById("book_detail_modal");
const book_details_name = document.getElementsByClassName("book_details_name");



function fireModal(event) {
  if (event.target.className === "action") {
    book_detail_modal.style.display = "block";
    book_detail_modal.classList.add('show_modal');
    return;
  }
}

for (let i = 0; i < action_btn.length; i++) {
  action_btn[i].addEventListener("click", fireModal);
}

/****
 *  End functionality for Dashboard Borrowed Books
 * ****/
