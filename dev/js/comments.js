/**
 * Created by Natasha on 24.03.2016.
 */
(function () {
    var container = document.getElementById("comment-block");
    var nameA = document.getElementById("nameA");
    var nameZ= document.getElementById("nameZ");
    var dateNew = document.getElementById("dateNew");
    var dateOld = document.getElementById("dateOld");
    var subjA = document.getElementById("subjA");
    var subjZ = document.getElementById("subjZ");
    var comments = [];
    var filteredComs = [];
    container.innerHTML = "";
    var review = document.getElementById("review");
    var nameErr = document.getElementById("nameErr");
    var subjErr = document.getElementById("subjErr");
    var textErr = document.getElementById("textErr");
    var comHead = document.getElementById("name");
    var comSubj = document.getElementById("subj");
    var comRev = document.getElementById("review");
    var create = document.getElementById("create");
    var nameTextErr = document.getElementById("nameTextErr");
    var subjTextErr = document.getElementById("subjTextErr");
    var comTextErr = document.getElementById("comTextErr");

    // Отправляем XMLHttp-запрос и, в случае успеха, отрисовываем комментарии, используя содержимое ответа

    xhrUtils.getAll("comment", renderComment, xhrUtils.failedRequest);

    // Вызов функции отрисовски ком-ев

    function renderComment (commentData) {
        filteredComs = commentData;
        for (var i in commentData) {
            createComment(commentData[i]);
        }
    }

    // Ивентлисенеры, которые инициализируют сортировку ком-ев и заново их отрисовывают

    nameA.addEventListener("click", function(e) {
        sortChange("NameA");
    });
    nameZ.addEventListener("click", function(e) {
        sortChange("NameZ");
    });
    dateNew.addEventListener("click", function(e) {
        sortChange("DateNew");
    });
    dateOld.addEventListener("click", function(e) {
        sortChange("DateOld");
    });
    subjA.addEventListener("click", function(e) {
        sortChange("SubjA");
    });
    subjZ.addEventListener("click", function(e) {
        sortChange("SubjZ");
    });

    // Функция, которая сортрирует ком-ии и заново их отрисовывает

    function sortChange(val) {
        container.innerHTML = "";
        //console.log(filteredComs);
        sortBy(val);
        renderComment(filteredComs);
    }

    // Функция, описывающая критерии сортировки ком-ев

    function sortBy(val) {
        var sorters = {
            "NameA": function (val1, val2) {
                var a = val1.name,
                    b = val2.name;
                return a === b ? 0 : a < b ? -1 : 1;
            },
            "NameZ": function (val1, val2) {
                var a = val1.name,
                    b = val2.name;
                return a === b ? 0 : a > b ? -1 : 1;
            },
            "DateNew": function (val1, val2) {
                var a = val1.id,
                    b = val2.id;
                return a === b ? 0 : a > b ? -1 : 1;
            },
            "DateOld": function (val1, val2) {
                var a = val1.id,
                    b = val2.id;
                return a === b ? 0 : a < b ? -1 : 1;
            },
            "SubjA": function (val1, val2) {
                var a = val1.name,
                    b = val2.name;
                return a === b ? 0 : a < b ? -1 : 1;
            },
            "SubjZ": function (val1, val2) {
                var a = val1.name,
                    b = val2.name;
                return a === b ? 0 : a > b ? -1 : 1;
            }
        };

        filteredComs.sort(sorters[val]);
    }

    // Функция, которая добавляет в общий контейнер div-ы с комментариями

    function createComment (data) {
        var comment = newComment(data);
        comments.push(comment);
        container.appendChild(comment);
    }

    // Вызов фун-ии добавления нового ком-ия с проверкой заполняемых полей

    createCommentBlock();

    // Функция добавления нового ком-ия с проверкой заполняемых полей

    function createCommentBlock () {
        create.addEventListener("click", function (e) {
            if (comHead.value == "" ) {
                nameErr.classList.add("has-error");
                nameTextErr.classList.add("commErr");
                e.preventDefault();
            } if (comSubj.value == "" )  {
                subjErr.classList.add("has-error");
                subjTextErr.classList.add("commErr");
                e.preventDefault();
            } if (comRev.value == "" )  {
                textErr.classList.add("has-error");
                comTextErr.classList.add("commErr");
                e.preventDefault();
            } else {
                xhrUtils.create({
                    name: comHead.value,
                    subj: comSubj.value,
                    body: comRev.value,
                    date: moment().format('MMMM Do YYYY, HH:mm:ss')
                }, "comment", function (data) {
                    createComment(data);
                });
            }
        });
        comHead.addEventListener("blur", function (e) { // Проверяет заполнение поля без повторного submit-а
            if (comHead.value !== "") {
                nameErr.classList.remove("has-error");
                nameTextErr.classList.remove("commErr");
                console.log(e);
            }
        });
        comSubj.addEventListener("blur", function (e) { // Проверяет заполнение поля без повторного submit-а
            if (comSubj.value !== "") {
                subjErr.classList.remove("has-error");
                subjTextErr.classList.remove("commErr");
                console.log(e);
            }
        });
        comRev.addEventListener("blur", function (e) { // Проверяет заполнение поля без повторного submit-а
            if (comRev.value !== "") {
                textErr.classList.remove("has-error");
                comTextErr.classList.remove("commErr");
                console.log(e);
            }
        });
    }

    // Функция, которая создает div для комментрия, добавляет возможность редактровать его и удалять

    function newComment(content) {

        var id, pan, panhead, username, del, date, panbody, comhead, comline,comtext;
        id = content.id;

        var element = document.createElement('div');
        element.classList.add("col-md-6");

        createCommentName();
        renderComment();
        initListeners();

        // Создание дива для комментраия

        function createCommentName() {
            pan = document.createElement('div');
            pan.classList.add("panel");
            pan.classList.add("panel-default");
            panhead = document.createElement('div');
            panhead.classList.add("panel-heading");
            username = document.createElement('strong');
            date = document.createElement('span');
            date.classList.add("text-muted");
            date.classList.add("italic");
            del = document.createElement('button');
            del.classList.add("btn");
            del.classList.add("btn-default");
            del.classList.add("btn-xs");
            del.style.float="right";
            del.innerHTML = "Delete";
            panbody = document.createElement('div');
            comtext = document.createElement('p');
            comhead = document.createElement('h5');
            comline = document.createElement('hr');
            comline.classList.add("small");
            comhead.classList.add("comment-head");
            panbody.classList.add("panel-body");
            comhead.setAttribute("contenteditable", "");
            comtext.setAttribute("contenteditable", "");
            element.appendChild(pan);
            pan.appendChild(panhead);
            panhead.appendChild(username);
            panhead.appendChild(date);
            panhead.appendChild(del);
            pan.appendChild(panbody);
            panbody.appendChild(comhead);
            panbody.appendChild(comline);
            panbody.appendChild(comtext);
        }

        // Лисенеры, инициализирующие редактрование и удаление комментария

        function initListeners () {
            comhead.addEventListener("blur", function (e) {
                sendChanges();
                console.log(e);
            });

            comtext.addEventListener("blur", function (e) {
                sendChanges();
                console.log(e);
            });

            del.addEventListener("click", function (e) {
                xhrUtils.deleteRecord(id, "comment", function () {
                    destroy();
                }, xhrUtils.failedRequest);
            });

        }

        // Редактирование содержимого div-а с комментом

        function sendChanges () {
            content.subj = comhead.innerHTML;
            content.body = comtext.innerHTML;
            content.date = date.innerHTML;
            date.innerHTML = moment().format('MMMM Do YYYY, HH:mm:ss');
            xhrUtils.update(content, id, 'comment');
            console.log(content);
        }

        // Удалене div-а с комментом

        function destroy () {
            element.remove();
        }

        // Отрисовка содержимого ответа XMLHttp-запроса

        function renderComment () {
            username.innerHTML = content.name;
            comhead.innerHTML = content.subj;
            comtext.innerHTML = content.body;
            date.innerHTML = " " + content.date;
        }
        return element;
    }


})();