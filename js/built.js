/**
 * Created by Natasha on 24.03.2016.
 */
var xhrUtils = (function () {

    function getByID(id, locator, callbackSuccess, callbackFailure) {
        request("GET", null, id, locator, callbackSuccess, callbackFailure);
    }

    function getAll(locator, callbackSuccess, callbackFailure) {
        request("GET", null, null, locator, callbackSuccess, callbackFailure);
    }

    function create(data, locator, callbackSuccess, callbackFailure) {
        request("POST", data, null, locator, callbackSuccess, callbackFailure);
    }

    function update(data, id, locator, callbackSuccess, callbackFailure) {
        request("PUT", data, id, locator, callbackSuccess, callbackFailure);
    }

    function deleteRecord (id, locator, callbackSuccess, callbackFailure) {
        request("DELETE", null, id, locator, callbackSuccess, callbackFailure);
    }

    function request (type, data, resourceId, locator, callback, failure) {
        var newRequest = new XMLHttpRequest(),
            id = resourceId ? resourceId : "",
            uri = 'http://localhost:3000/' + locator + '/' + id;

        newRequest.open(type, uri, true);

        newRequest.setRequestHeader("Content-Type", "application/json");

        newRequest.send(data ? JSON.stringify(data) : null);

        newRequest.addEventListener("load", function () {
            console.log("Request complete");
            if (newRequest.status === 200 || newRequest.status === 201) {
                console.log("Success!!!");
                if (callback) {
                    callback(JSON.parse(newRequest.responseText), newRequest);
                }
            } else if (failure) {
                failure(JSON.parse(newRequest.responseText));
            }
        });
    }

    function failedRequest (response) {
        console.error(response);
    }

    return {
        getByID: getByID,
        getAll: getAll,
        create: create,
        update: update,
        deleteRecord: deleteRecord,
        failedRequest: failedRequest
    }
})();;/**
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

})();;/**
 * Created by Natasha on 26.03.2016.
 */
(function () {


})();
;/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    // $("h1").fitText(
    //     1.2, {
    //         minFontSize: '35px',
    //         maxFontSize: '65px'
    //     }
    // );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
