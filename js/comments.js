/**
 * Created by Natasha on 24.03.2016.
 */
(function () {
    var container = document.getElementById("comment-block");
    var comments = [];
    container.innerHTML = "";
    var review = document.getElementById("review");

    //createCommentBlock();
    xhrUtils.getAll("comment", renderComment, xhrUtils.failedRequest);

    function renderComment (commentData) {
        for (var i in commentData) {
            createComment(commentData[i]);
        }
    }
    function createComment (data) {
        var comment = newComment(data);
        comments.push(comment);
        container.appendChild(comment);
    }

    createCommentBlock(function () {
        xhrUtils.getAll("comment", renderComment, xhrUtils.failedRequest);
    });

    function createCommentBlock () {
        var comHead = document.getElementById("name");
        var comSubj = document.getElementById("subj");
        var comRev = document.getElementById("review");
        var create = document.getElementById("create");

        create.addEventListener("click", function () {
            xhrUtils.create({name: comHead.value, subj: comSubj.value, body: comRev.value, date: moment().format('MMMM Do YYYY, HH:mm:ss')}, "comment", function (data) {
                createComment(data);
            });
        });
    }

    function newComment(content) {

        var id, pan, panhead, username, del, date, panbody, comhead, comline,comtext;
        id = content.id;

        var element = document.createElement('div');
        element.classList.add("col-md-6");

        createCommentName();

        renderComment();
        initListeners();


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

        function sendChanges () {
            content.subj = comhead.innerHTML;
            content.body = comtext.innerHTML;
            content.date = date.innerHTML;
            date.innerHTML = " " +  moment().format('MMMM Do YYYY, HH:mm:ss');
            xhrUtils.update(content, id, 'comment');
            console.log(content);
        }

        function destroy () {
            element.remove();
        }

        function renderComment () {
            username.innerHTML = content.name;
            comhead.innerHTML = content.subj;
            comtext.innerHTML = content.body;
            date.innerHTML = " " + content.date;
        }
        return element;
    }

})();