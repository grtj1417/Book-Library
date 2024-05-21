const myLibrary = [];

const addBook = document.querySelector(".add-book-btn");
const dialog = document.querySelector(".add-book-dialog");
const form = document.querySelector("form");
const createBookButton = document.querySelector(".create-book-btn");
const bookArea = document.querySelector(".main");


function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary() {
    const title = document.querySelector(".title-input").value;
    const author = document.querySelector(".author-input").value;
    const pages = document.querySelector(".pages-input").value;
    myLibrary.push(new Book(title, author, pages));

    form.reset();
}

function diplayBook() {
    let lastAddedBookInLibrary = myLibrary.at(-1);

    const newBook = document.createElement("div");
    newBook.classList.add("new-book");
    bookArea.append(newBook);

    const bookTitle = document.createElement("p");
    bookTitle.textContent = lastAddedBookInLibrary.title;
    
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = lastAddedBookInLibrary.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = lastAddedBookInLibrary.pages;

    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status-btn");
    readStatusButton.textContent = "Unread";
    //read狀態轉換
    readStatusButton.addEventListener("click", () => {
        readStatusButton.textContent = (readStatusButton.textContent === "Unread") ? "Read" : "Unread";
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    

    deleteButton.addEventListener("click", () => {
        // Remove book from library
        myLibrary.splice(myLibrary.indexOf(Book), 1); 
        newBook.classList.add("deleted"); // 添加 CSS 類
        setTimeout(() => {
        newBook.remove(); // 等待動畫結束後再刪除元素
        }, 300); 
    });

    newBook.append(bookTitle, bookAuthor, bookPages, readStatusButton, deleteButton);
}

function validateInputs() {
    const title = document.querySelector(".title-input").value;
    const author = document.querySelector(".author-input").value;
    const pages = document.querySelector(".pages-input").value;
    
    return title && author && pages;
}

addBook.addEventListener("click", () => {
    dialog.showModal();
})

createBookButton.addEventListener("click", () => {
    if (validateInputs()) {
        addBookToLibrary();
        diplayBook();
        dialog.close();
    }
});

dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        dialog.close();
    }
});