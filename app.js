//BOOK CLASS: REPRESENTS A BOOK
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI CLASS: HANDLE UI TASKS
class UI {
    static displaybooks() {
        // const storedbooks = [{
        //     title: "book one",
        //     author: "John Doe",
        //     isbn: "3434434"
        // },
        // {
        //     title: "book two",
        //     author: "Jane Doe",
        //     isbn: "45545"
        // }];

        // const books = storedbooks;
        const books = store.getbooks();
        books.forEach((book) => UI.addbooktolist(book));
    }

    static addbooktolist(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);

    }
    static deletebook(el) {
        if(el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    } 
    static showalert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        //VANISH COMMENT IN 3 SEC
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }



    static clearfields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";

    }
}



//STORE CLASS: HANDLE STORAGE
class store {
    static getbooks() {
        let books;
        if(localStorage.getItem("books")=== null) {
            books = [];

        } else {
            books = JSON.parse(localStorage.getItem("books"));

        }
        return books;
    }

    static addbook(book) {
        const books = store.getbooks();

        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removebook(isbn) {
        const books = store.getbooks();

        books.forEach((book, index)=> {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));

    }
}





//EVENT: DISPLAY BOOKS
document.addEventListener("DOMContentLoaded", UI.displaybooks);


//EVENT: ADD A BOOK
document.querySelector("#book-form").addEventListener("submit",(e)=>{
    //PREVENT ACTUAL SUBMIT
    e.preventDefault();
    //GET VALUES FROM FORM
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //VALIDATE
    if(title === "" || author === "" || isbn === "") {
        UI.showalert("Please fill all fields", "danger");
    } else{
        //INSTANTIATE A BOOK
        const book = new Book(title,author,isbn);
        
        //ADD BOOK TO UI
        UI.addbooktolist(book);

        //ADD BOOK TO STORE
        store.addbook(book);

        //show success message
        UI.showalert("Book Added", "success");

        //CLEAR FIELDS
        UI.clearfields();

        }
});


//REMOVE A BOOK
document.querySelector("#book-list").addEventListener("click", (e)=> {
    //REMPVE BOOK FROM UI
    UI.deletebook(e.target)

    //REMOVE BOOK FROM STORE
    store.removebook(e.target.parentElement.previousElementSibling.textContent);



    //show Book deleted message
    UI.showalert("Book Removed", "success");
});


