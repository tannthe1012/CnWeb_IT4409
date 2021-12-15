const question_title = document.getElementById("question-title");
const question_header_time = document.getElementById("question-header-time");
const question_header_view = document.getElementById("question-header-view");
const countlike_question = document.getElementById("countlike-question");
const question_content = document.getElementById("question-content");
const question_tags = document.getElementById("question-tags");
const count_answer = document.getElementById("count-answer");
const answers = document.getElementById("total-answer");
const owner = document.getElementById("question-header-owner");
const btn_post_answer = document.getElementById("btn-post-answer");
const btn_ask_question = document.getElementById("question-ask");
const btn_upvote_question = document.getElementById("upvote-question")
const btn_downvote_question = document.getElementById("downvote-question");
const modal = document.getElementById("myModal");
const btn_update_answer = document.getElementById("btn_update_answer")
const content_answer_update = document.getElementById("content-your-answer-update");
const span = document.getElementsByClassName("close")[0];
window.localStorage.setItem("profileId", localStorage.getItem("userId"));
function loadData() {
    const date = new Date();
    var questionId = window.localStorage.getItem("questionId");
    var userId = window.localStorage.getItem("userId");
    axios({
        method: 'GET',
        url: `https://localhost:44382/api/Question/${questionId}/${userId}`,
        data: null
    }).then(function (response) {
        console.log(response)
        question_title.innerHTML = response.data.title;
        question_header_time.innerHTML = rendHTMLTime(date, response.data.createTime);
        question_header_view.innerHTML = response.data.view;
        countlike_question.innerHTML = response.data.countLike;
        question_content.innerHTML = response.data.content;
        question_tags.innerHTML = rendHTMLTag(response.data.tags);
        count_answer.innerHTML = response.data.countAnswer;
        owner.innerHTML = response.data.name;
        answers.innerHTML = "";
        if (response.data.statusLike == 1) {
            btn_upvote_question.classList.add("active");
        } else if (response.data.statusLike == -1) {
            btn_downvote_question.classList.add("active");
        }
        response.data.answers.forEach(answer => {
            let dateanswer = new Date(answer.modifyTime);
            let ownerId = answer.userId;
            let stringOwnerOption = ``;
            if (ownerId == localStorage.getItem("userId")) {

                console.log(answer.content);
                stringOwnerOption = `
                <div class="edit-delete-btn">
                    <div onclick="openedit(event)">...</div>
                    <div class="bound-edit none">
                        <div class="edit-btn" answerId="${answer.id}" onclick="editanswer(event)">Edit</div>
                        <div class="delete-btn" answerId="${answer.id}" onclick="deteleanswer(event)">Delete</div>
                    </div>
                </div>
                `;
            }
            console.log(answer.modifyTime);
            let dateString;
            if (dateanswer.getMinutes() < 10) {
                dateString = `${dateanswer.getDate()}/${dateanswer.getMonth() + 1}/${dateanswer.getFullYear()} at ${dateanswer.getHours()}:0${dateanswer.getMinutes()}`

            } else {
                dateString = `${dateanswer.getDate()}/${dateanswer.getMonth() + 1}/${dateanswer.getFullYear()} at ${dateanswer.getHours()}:${dateanswer.getMinutes()}`
            }
            console.log(dateString);

            if (answer.statusLike == 1) {
                answers.innerHTML = answers.innerHTML +
                `
                    <div class="answer flex">
                        <div class="vote-cell">
                            <button class="icon-upvote active" onclick="clickUpVote(event)"><i class="fas fa-thumbs-up" answerId="${answer.id}"></i></button>
                            <div class="count-vote" >${answer.like}</div>
                            <button class="icon-downvote"  onclick="clickDownVote(event)"><i class="fas fa-thumbs-down" answerId="${answer.id}" ></i></button>
                        </div>
                        <div class="question-main">
                            <div class="answer-content">
                                <div>
                                    ${answer.content}
                                </div>`
                                + stringOwnerOption +
                                `
                            </div>
                            <div class="answer-detail">
                                <div class="answer-time">Answered ${dateString}</div>
                                <div class="answer-owner">${answer.name}</div>
                            </div>
                        </div>
                        
                    </div>
                 `
            } else if (answer.statusLike == -1) {
                answers.innerHTML = answers.innerHTML +
                `
                    <div class="answer flex">
                        <div class="vote-cell">
                            <button class="icon-upvote" onclick="clickUpVote(event)"><i class="fas fa-thumbs-up" answerId="${answer.id}"></i></button>
                            <div class="count-vote" >${answer.like}</div>
                            <button class="icon-downvote active"  onclick="clickDownVote(event)"><i class="fas fa-thumbs-down" answerId="${answer.id}" ></i></button>
                        </div>
                        <div class="question-main">
                            <div class="answer-content">
                                <div>
                                    ${answer.content}
                                </div>`
                                + stringOwnerOption +
                                `
                            </div>
                            <div class="answer-detail">
                                <div class="answer-time">Answered ${dateString}</div>
                                <div class="answer-owner">${answer.name}</div>
                            </div>
                        </div>
                        
                    </div>
                 `
            } else {
                answers.innerHTML = answers.innerHTML +
                    `
                <div class="answer flex">
                            <div class="vote-cell">
                                <button class="icon-upvote" onclick="clickUpVote(event)"><i class="fas fa-thumbs-up" answerId="${answer.id}"></i></button>
                                <div class="count-vote" >${answer.like}</div>
                                <button class="icon-downvote"  onclick="clickDownVote(event)"><i class="fas fa-thumbs-down" answerId="${answer.id}" ></i></button>
                            </div>
                            <div class="question-main">
                                <div class="answer-content">
                                    <div>
                                        ${answer.content}
                                    </div>`
                                    + stringOwnerOption +
                                    `
                                </div>
                                <div class="answer-detail">
                                    <div class="answer-time">Answered ${dateString}</div>
                                    <div class="answer-owner">${answer.name}</div>
                                </div>
                            </div>
                            
                        </div>
                `
            }



        })

    }).catch(function () {
        console.log("đã có lỗi xảy ra");
        // loadData();
    });
}
function rendHTMLTag(tags) {
    let listtags = ``;
    tags.forEach(tag => {
        listtags += `<a href="#" class="post-tags">${tag.name}</a>
        `
    })
    return listtags;
}

function rendHTMLTime(now, createDate) {
    let date = new Date(createDate);
    if ((now.getFullYear() - date.getFullYear()) >= 1) {
        return `${now.getFullYear() - date.getFullYear()} years ago `
    }
    if (now.getMonth() - date.getMonth() >= 1) {
        return `${now.getMonth() - date.getMonth()} months ago `
    }
    if (now.getDay() - date.getDay() >= 1) {
        return `${now.getDay() - date.getDay()} days ago `
    }
    if (now.getHours() - date.getHours() >= 1) {
        return `${now.getHours() - date.getHours()} hours ago `
    }
    if (now.getMinutes() - date.getMinutes() >= 1) {
        return `${now.getMinutes() - date.getMinutes()} min ago `
    }
    if (now.getSeconds() - date.getSeconds() >= 1) {
        return `${now.getSeconds() - date.getSeconds()} seconds ago `
    }
}

btn_post_answer.addEventListener('click', () => {
    let answer_content = document.getElementById("content-your-answer").value;
    if (answer_content == null || answer_content == "") {
        alert("Mời nhập câu trả lời")
    } else {
        //call api post answer
        var answer = {
            Content: answer_content,
            UserId: localStorage.getItem('userId'),
            QuestionId: localStorage.getItem('questionId')
        };
        axios({
            method: 'POST',
            url: 'https://localhost:44382/api/Answer',
            data: answer
        }).then(function (response) {
            //handle success
            console.log(response)
            if (response.data.isValid == true && response.status == 200) {
                console.log("thanh cong");
                window.location = `http://127.0.0.1:5500/html/questiondetail.html`
            } else {
                alert(response.data.message);
            }
        }).catch(function (response) {
            //handle error
            alert("Đã có lỗi xảy ra vui long đăng tải lại");
            console.log(response);
        });

    }

})
btn_ask_question.addEventListener('click', () => {
    window.location = `http://127.0.0.1:5500/html/askquestion.html`
})

btn_upvote_question.addEventListener('click', () => {
    if (btn_downvote_question.classList.contains("active")) {
        btn_downvote_question.classList.remove("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) + 1;
    }
    // neu like thi bo like
    if (btn_upvote_question.classList.contains("active")) {
        btn_upvote_question.classList.remove("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) - 1;
        CallApiLike(0);
    }
    // neu chua like thi like
    else {
        btn_upvote_question.classList.add("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) + 1;
        CallApiLike(1);
    }
})
btn_downvote_question.addEventListener('click', () => {
    if (btn_upvote_question.classList.contains("active")) {
        btn_upvote_question.classList.remove("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) - 1;
    }
    // neu dislike thi bo dislike
    if (btn_downvote_question.classList.contains("active")) {
        btn_downvote_question.classList.remove("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) + 1;
        CallApiLike(0);

    }
    // neu chua like thi like
    else {
        btn_downvote_question.classList.add("active");
        countlike_question.innerHTML = Number(countlike_question.innerText) - 1;
        CallApiLike(-1);
    }
    // console.log(countlike_question.innerText);
})
function clickUpVote(event) {
    let answerId = event.target.getAttribute('answerid');
    let btn_down = event.target.parentElement.nextElementSibling.nextElementSibling;
    let count_vote = event.target.parentElement.nextElementSibling;
    let btn_up = event.target.parentElement;
    if (btn_down.classList.contains("active")) {
        btn_down.classList.remove("active");
        count_vote.innerHTML = Number(count_vote.innerText) + 1;
    }
    // neu like thi bo like
    if (btn_up.classList.contains("active")) {
        btn_up.classList.remove("active");
        count_vote.innerHTML = Number(count_vote.innerText) - 1;
        CallApiLikeAnswer(answerId, 0);
    }
    // neu chua like thi like
    else {
        btn_up.classList.add("active");
        count_vote.innerHTML = Number(count_vote.innerText) + 1;
        CallApiLikeAnswer(answerId, 1);
    }

}

function clickDownVote(event) {
    let answerId = event.target.getAttribute('answerid');
    let btn_down = event.target.parentElement;
    let count_vote = event.target.parentElement.previousElementSibling;
    let btn_up = event.target.parentElement.previousElementSibling.previousElementSibling;
    if (btn_up.classList.contains("active")) {
        btn_up.classList.remove("active");
        count_vote.innerHTML = Number(count_vote.innerText) - 1;
    }
    // neu dislike thi bo dislike
    if (btn_down.classList.contains("active")) {
        btn_down.classList.remove("active");
        count_vote.innerHTML = Number(count_vote.innerText) + 1;
        CallApiLikeAnswer(answerId, 0);
    }
    // neu chua like thi like
    else {
        btn_down.classList.add("active");
        count_vote.innerHTML = Number(count_vote.innerText) - 1;
        CallApiLikeAnswer(answerId, -1);
    }

}


function CallApiLike(status) {
    var userquestion = {
        UserId: localStorage.getItem("userId"),
        QuestionId: localStorage.getItem("questionId"),
        Status: status
    }
    axios({
        method: 'PUT',
        url: 'https://localhost:44382/api/Question/like',
        data: userquestion
    }).then(function (response) {
        //handle success
        console.log(response)
        if (response.data.isValid == true && response.status == 200) {
            console.log("thanh cong");
            
        } else {
            alert(response.data.message);
        }
    }).catch(function (response) {
        //handle error
        alert("Đã có lỗi xảy ra vui long đăng tải lại");
        console.log(response);
    });

}

function CallApiLikeAnswer(answerId, status) {
    var useranswer = {
        UserId: localStorage.getItem("userId"),
        AnswerId: answerId,
        Status: status
    }
    axios({
        method: 'PUT',
        url: 'https://localhost:44382/api/Answer/like',
        data: useranswer
    }).then(function (response) {
        //handle success
        console.log(response)
        if (response.data.isValid == true && response.status == 200) {
            console.log("thanh cong");
            
        } else {
            alert(response.data.message);
        }
    }).catch(function (response) {
        //handle error
        alert("Đã có lỗi xảy ra vui long đăng tải lại");
        console.log(response);
    });

}

function openedit(e) {
    let bound_edit = e.target.nextElementSibling;
    if (bound_edit.classList.contains("none")) {
        bound_edit.classList.remove("none");
    } else {
        bound_edit.classList.add("none");
    }
}
function deteleanswer(event) {
    let answerId = event.target.getAttribute('answerid');
    console.log(answerId);
    let bound_edit = event.target.parentElement;
    bound_edit.classList.add("none");
    axios({
        method: 'DELETE',
        url: `https://localhost:44382/api/Answer/${answerId}`,
        data: null
    }).then(function (response) {
        //handle success
        console.log(response)
        if (response.data.isValid == true && response.status == 200) {
            loadData();
            console.log("thanh cong");
        } else {
            alert(response.data.message);
        }
    }).catch(function (response) {
        //handle error
        alert("Đã có lỗi xảy ra vui long đăng tải lại");
        console.log(response);
    });

}
function editanswer(event) {
    let answerId = event.target.getAttribute('answerid');
    localStorage.setItem("answerIdUpdate",answerId);
    modal.style.display = "block";
    let bound_edit = event.target.parentElement;
    bound_edit.classList.add("none");

}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

btn_update_answer.addEventListener('click', () => {
    let contentUpdate = content_answer_update.value;
    if (contentUpdate == null || contentUpdate == "") {
        alert("moi ban nhap content");
    } else {
        var answer = {
            Id : localStorage.getItem("answerIdUpdate"),
            Content: contentUpdate, 
        }
        axios({
            method: 'PUT',
            url: 'https://localhost:44382/api/Answer',
            data: answer
        }).then(function (response) {
            //handle success
            console.log(response)
            if (response.data.isValid == true && response.status == 200) {
                modal.style.display = "none";
                loadData();
                console.log("thanh cong");
            } else {
                alert(response.data.message);
            }
        }).catch(function (response) {
            //handle error
            alert("Đã có lỗi xảy ra vui long đăng tải lại");
            console.log(response);
        });
    }
    


})




loadData();