class Contacts{
    #data = [];

    add(users){
        let user = new User(users.get());
        this.#data.push(user);
    }

    edit(id, obj){
        let user = this.#data.find(item => item.get().id === +id);
        if(user !== undefined){
            user.edit(obj.get());
        }
    }

    search(id){
        let user = this.#data.find(item => item.get().id === +id);
        if(user !== undefined){
           return user.data;
        }
    }

    remove(id){
        for(let i=0; i<this.#data.length; i++){
            if(this.#data[i].get().id === id){
                this.#data.splice(i, 1);
            }
        }
    }

    get(){
        return this.#data;
    }

    set(data){
        this.#data = [...data];
    }
}

class User{
    constructor(data) {
        this.data = {
            id: data.id,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone
        }
    }

    edit(obj){
        this.data.id = obj.id;
        this.data.name = obj.name;
        this.data.email = obj.email;
        this.data.address = obj.address;
        this.data.phone = obj.phone;
    }

    get(){
        return this.data;
    }
}

class ContactsApp extends Contacts{
    #data = [];

    #maxIndex;
    #cookieName;
    #cookieValue;
    #cookieExpires;

    constructor(){
        super();
        let container = document.createElement("div");
        container.classList.add("contacts");
        document.body.append(container);
        this.app = container;
        if(!this.storage){
           this.getData();
        } else{
            this.#maxIndex = +JSON.parse(this.storage)[JSON.parse(this.storage).length - 1].data.id + 1;
            this.get();
        }
        this.#cookieName = 'storageExpiration';
        this.#cookieValue = new Date(Date.now() + 864000).toUTCString();
        this.#cookieExpires = 864000;
        if (!this.getCookie(this.#cookieName)) {
            this.deleteCookie();
            localStorage.clear();
        }
    }

    addForm(){
        let wrap = document.createElement("div");
        wrap.classList.add("wrap");
        this.app.append(wrap);

        let wrapItem1 = document.createElement("div");
        wrapItem1.classList.add("wrap__item");
        wrap.append(wrapItem1);

        let img = document.createElement("div");
        img.innerHTML = "<img src='./img/logo.png' alt='Logo'>"
        wrapItem1.append(img);

        let wrapItem2 = document.createElement("div");
        wrapItem2.classList.add("wrap__item");
        wrap.append(wrapItem2);

        let h1 = document.createElement("h1");
        h1.innerHTML = "Contacts";
        wrapItem2.append(h1);

        let formAdd = document.createElement("form");
        formAdd.classList.add("form");
        formAdd.classList.add("formAdd");
        wrapItem2.append(formAdd);

        let containerInput1 = document.createElement("div");
        containerInput1.classList.add("container");
        formAdd.append(containerInput1);

        let labelId = document.createElement("label");
        labelId.setAttribute("for", "id");
        labelId.innerHTML = "ID";
        containerInput1.append(labelId);

        let id = document.createElement("input");
        id.setAttribute("type", "number");
        id.setAttribute("readonly", "readonly");
        id.setAttribute("value", `${this.#maxIndex}`);
        id.setAttribute("id", "id");
        id.classList.add("id");
        containerInput1.append(id);

        let containerInput2 = document.createElement("div");
        containerInput2.classList.add("container");
        formAdd.append(containerInput2);

        let labelName = document.createElement("label");
        labelName.setAttribute("for", "name");
        labelName.innerHTML = "Name";
        containerInput2.append(labelName);

        let name = document.createElement("input");
        name.setAttribute("type", "text");
        name.classList.add("name");
        name.setAttribute("required", "");
        name.setAttribute("placeholder", "Enter name");
        name.setAttribute("id", "name");
        containerInput2.append(name);

        let containerInput3 = document.createElement("div");
        containerInput3.classList.add("container");
        formAdd.append(containerInput3);

        let labelEmail = document.createElement("label");
        labelEmail.setAttribute("for", "email");
        labelEmail.innerHTML = "Email";
        containerInput3.append(labelEmail);

        let email = document.createElement("input");
        email.setAttribute("type", "email");
        email.classList.add("email");
        email.setAttribute("required", "");
        email.setAttribute("placeholder", "Enter email");
        email.setAttribute("id", "email");
        containerInput3.append(email);

        let containerInput4 = document.createElement("div");
        containerInput4.classList.add("container");
        formAdd.append(containerInput4);

        let labelAddress = document.createElement("label");
        labelAddress.setAttribute("for", "address");
        labelAddress.innerHTML = "Address";
        containerInput4.append(labelAddress);

        let address = document.createElement("input");
        address.setAttribute("type", "text");
        address.classList.add("address");
        address.setAttribute("required", "");
        address.setAttribute("placeholder", "Enter address");
        address.setAttribute("id", "address");
        containerInput4.append(address);

        let containerInput5 = document.createElement("div");
        containerInput5.classList.add("container");
        formAdd.append(containerInput5);

        let labelPhone = document.createElement("label");
        labelPhone.setAttribute("for", "phone");
        labelPhone.innerHTML = "Phone";
        containerInput5.append(labelPhone);

        let phone = document.createElement("input");
        phone.setAttribute("type", "tel");
        phone.classList.add("phone");
        phone.setAttribute("required", "");
        phone.setAttribute("placeholder", "Enter phone");
        phone.setAttribute("id", "phone");
        containerInput5.append(phone);

        let btnAdd = document.createElement("button");
        btnAdd.setAttribute("type", "submit");
        btnAdd.classList.add("btnAdd");
        btnAdd.classList.add("btn");
        btnAdd.innerHTML = "Добавить";
        formAdd.append(btnAdd);


        let error = document.createElement("p");
        error.classList.add("error");
        wrapItem2.append(error);


        let formEditOrDel = document.createElement("form");
        formEditOrDel.classList.add("form");
        formEditOrDel.classList.add("formEditOrDel");
        wrapItem2.append(formEditOrDel);

        let containerInput6 = document.createElement("div");
        containerInput6.classList.add("container");
        formEditOrDel.append(containerInput6);

        let labelIdED = document.createElement("label");
        labelIdED.setAttribute("for", "idED");
        labelIdED.innerHTML = "ID";
        containerInput6.append(labelIdED);

        let idEditOrDel = document.createElement("input");
        idEditOrDel.setAttribute("type", "number");
        idEditOrDel.classList.add("id");
        idEditOrDel.setAttribute("placeholder", "Enter ID");
        idEditOrDel.setAttribute("id", "idED");
        containerInput6.append(idEditOrDel);

        let containerBTN= document.createElement("div");
        containerBTN.classList.add("containerBTN");
        formEditOrDel.append(containerBTN);

        let btnEdit = document.createElement("button");
        btnEdit.setAttribute("type", "submit");
        btnEdit.classList.add("btnEdit");
        btnEdit.classList.add("btn");
        btnEdit.innerHTML = "Редактировать";
        containerBTN.append(btnEdit);

        let btnDel = document.createElement("button");
        btnDel.setAttribute("type", "submit");
        btnDel.classList.add("btn");
        btnDel.classList.add("btnDel");
        btnDel.innerHTML = "Удалить";
        containerBTN.append(btnDel);

        let btnContacts = document.createElement("div");
        btnContacts.classList.add("btnContacts");
        btnContacts.setAttribute("title", "Show all contacts")
        btnContacts.innerHTML = "<img src='./img/icon.png' alt='Icon'>";
        containerBTN.append(btnContacts);

        this.addTable();
    }

    addTable(){
        let tableContainer = document.createElement("div");
        tableContainer.classList.add("tableContainer");
        this.app.append(tableContainer);
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("hidden");
        table.innerHTML =   `<tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>`;
        tableContainer.append(table);
    }

    emptyTable(){
        let table = document.querySelector("table");
        table.innerHTML = table.rows[0].innerHTML;
    }

    showTable(){
        this.emptyTable();
        let table = document.querySelector("table");
        for(let i=0; i<this.#data.length; i++){
            let trNew = document.createElement("tr");
            table.append(trNew);
            for(let j = 0; j< 5; j++){
                let tdNew = document.createElement("td");
                trNew.append(tdNew);
            }
            let td = trNew.querySelectorAll("td");
            if(this.#data[i].data.address.street){
                td[0].innerHTML = this.#data[i].get().id;
                td[1].innerHTML = this.#data[i].get().name;
                td[2].innerHTML = this.#data[i].get().email;
                td[3].innerHTML = this.#data[i].get().address.street;
                td[4].innerHTML = this.#data[i].get().phone;
            } else{
                td[0].innerHTML = this.#data[i].get().id;
                td[1].innerHTML = this.#data[i].get().name;
                td[2].innerHTML = this.#data[i].get().email;
                td[3].innerHTML = this.#data[i].get().address;
                td[4].innerHTML = this.#data[i].get().phone;
            }
        }
    }

    onAdd(id, name, email, address, phone){
        document.cookie = `${this.#cookieName}=${this.#cookieValue};  max-age=${this.#cookieExpires}`;
        let user = {
            id: id,
            name: name,
            email: email,
            address: address,
            phone: phone
        }

        let users = new User(user);
        super.add(users);
        this.#maxIndex++;
        this.storage = super.get();
    }

    onEdit(id, name, email, address, phone){
        document.cookie = `${this.#cookieName}=${this.#cookieValue};  max-age=${this.#cookieExpires}`;
        let user = {
            id: id,
            name: name,
            email: email,
            address: address,
            phone: phone
        }

        let users = new User(user);
        super.edit(+id, users);
        this.storage = super.get();
    }

    onRemove(id){
        super.remove(id);
        if(this.#data.length === 0) localStorage.clear();
        else this.storage = this.#data;
    }

    get(){
        if(this.storage){
            JSON.parse(this.storage).forEach(item => {
                let user = new User(item.data);
                this.add(user);
            })
            this.#data = super.get();
        }
        else this.#data = super.get();
        return this.#data;
    }

    getIndex(){
        return this.#maxIndex;
    }

    get storage(){
       return localStorage.getItem("data");
    }

    set storage(data){
        localStorage.setItem("data", JSON.stringify(data));
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
           "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
     }

     deleteCookie() {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
           let name = cookies[i].indexOf('=') > -1 ? cookies[i].slice(0, cookies[i].indexOf('=')) : cookies[i];
           document.cookie = name + "=; max-age=-1";
        }
     }

     getData = async function() {
        const data = await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                data.forEach(item =>{
                    let user = new User(item);
                    this.add(user);
                })
                this.storage = this.get();
                this.#maxIndex = +JSON.parse(this.storage)[JSON.parse(this.storage).length - 1].data.id + 1;
                let formAdd = document.querySelector(".formAdd");
                let idAdd = formAdd.querySelector(".id");
                idAdd.setAttribute("value", `${this.#maxIndex}`);

            })
     }
}

class Validation{
    static validationPhone = (phone) => /^[0-9]{12}$/gi.test(phone);
    static validationEmail = (email) => /^[a-z][\w-.]+@([\w]+\.)+[a-z]{2,11}$/gi.test(email);
    static validationName = (name) => /[a-zа-я]/gi.test(name);
}



document.addEventListener("DOMContentLoaded", function(){
    let apps = new ContactsApp();
    apps.addForm();

    let formAdd = document.querySelector(".formAdd");
    let btnAdd = formAdd.querySelector(".btnAdd");
    let idAdd = formAdd.querySelector(".id");
    let name = formAdd.querySelector(".name");
    let email = formAdd.querySelector(".email");
    let address = formAdd.querySelector(".address");
    let phone = formAdd.querySelector(".phone");

    let formEditOrDel = document.querySelector(".formEditOrDel");
    let btnEdit = formEditOrDel.querySelector(".btnEdit");
    let btnDel = formEditOrDel.querySelector(".btnDel");
    let idEditOrDel = formEditOrDel.querySelector(".id");

    let error = document.querySelector(".error");

    let btnContacts = document.querySelector(".btnContacts");
    let table = document.querySelector("table");

    btnAdd.addEventListener("click", function(event){
        event.preventDefault();
        if(name.value !== '' && email.value !== '' && address.value !== '' && phone.value !== '') {
            if(Validation.validationPhone(phone.value) &&  Validation.validationEmail(email.value) && Validation.validationName(name.value)){
                apps.onAdd(+idAdd.value, name.value, email.value, address.value, phone.value);
                apps.showTable();
                idAdd.value = `${+apps.getIndex()}`;
                name.value = '';
                email.value = '';
                address.value = '';
                phone.value = '';
                error.innerHTML = '';
            } else{
                error.innerHTML = "Неверный ввод данных"
            }
        } else{
            error.innerHTML = "Все поля должны быть заполнены"
        }
    });

    btnEdit.addEventListener("click", function(event){
        event.preventDefault();
        if(btnEdit.innerHTML === "Сохранить"){
            btnAdd.disabled = false;
            if(name.value !== '' && email.value !== '' && address.value !== '' && phone.value !== '') {
                if(Validation.validationPhone(phone.value) && Validation.validationEmail(email.value) && Validation.validationName(name.value)){
                    apps.onEdit(+idAdd.value, name.value, email.value, address.value, phone.value);
                    apps.showTable();
                    idAdd.value = `${+apps.getIndex()}`;
                    name.value = '';
                    email.value = '';
                    address.value = '';
                    phone.value = '';
                    idEditOrDel.value = '';
                    error.innerHTML = '';
                    btnEdit.innerHTML = "Редактировать";
                } else{
                    error.innerHTML = "Неверный ввод данных"
                }
            } else{
                error.innerHTML = "Все поля должны быть заполнены"
            }
        } else{
            btnAdd.disabled = true;
            let user = apps.search(+idEditOrDel.value);
            if(user !== undefined){
                if(user.address.street){
                    idAdd.value = user.id;
                    name.value = user.name;
                    email.value = user.email;
                    address.value = user.address.street;
                    phone.value = user.phone;
                    btnEdit.innerHTML = "Сохранить";
                    error.innerHTML = ''
                } else{
                    idAdd.value = user.id;
                    name.value = user.name;
                    email.value = user.email;
                    address.value = user.address;
                    phone.value = user.phone;
                    btnEdit.innerHTML = "Сохранить";
                    error.innerHTML = ''
                }
            } else{
                error.innerHTML = 'Контакта с таким id нет';
                setTimeout(function(){
                    idEditOrDel.value = '';
                }, 1000)
            }
        }
    });

    btnDel.addEventListener("click", function(event){
        event.preventDefault();
        let user = apps.search(+idEditOrDel.value);
        if(user !== undefined){
            apps.onRemove(+idEditOrDel.value);
            apps.showTable();
            idAdd.value = `${+apps.getIndex()}`;
            name.value = '';
            email.value = '';
            address.value = '';
            phone.value = '';
            idEditOrDel.value = '';
            error.innerHTML = ''
        } else{
            error.innerHTML = 'Контакта с таким id нет';
            setTimeout(function(){
                idEditOrDel.value = '';
            }, 1000)
        }
    });

    btnContacts.addEventListener("click", function(){
       let status = table.classList.toggle("hidden");
       apps.showTable();
       let img = btnContacts.querySelector("img");
       if(!status){
            img.classList.add("hidden-img")
       } else{
            img.classList.remove("hidden-img")
       }
    })
})