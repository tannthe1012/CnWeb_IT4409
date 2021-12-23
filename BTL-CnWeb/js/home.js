const question_list = document.getElementById("question-mini-list");
const btn_ask_question = document.getElementById("question-ask");
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const btn_add_tag = document.getElementById("btn-add-tags");
const watched_tag = document.getElementById("watched-tags");
const input_filter = document.getElementById("stringfilter");
var stringfilter = '';
if (sessionStorage.getItem('stringfilter') != null ||sessionStorage.getItem('stringfilter') != '') {
    input_filter.value = sessionStorage.getItem('stringfilter')
    stringfilter = sessionStorage.getItem('stringfilter')
    console.log(sessionStorage.getItem('stringfilter') == null)
}
var tags = [];

const span = document.getElementsByClassName("close")[0];
window.sessionStorage.setItem("profileId", sessionStorage.getItem("userId"));
function loadData() {
    if (sessionStorage.getItem('stringfilter') == null) {
        stringfilter = '';
    }
    tags = JSON.parse(sessionStorage.getItem("tags"));
    watched_tag.innerHTML = "";
    tags.forEach(tag => {
        watched_tag.innerHTML += `<div class="post-tags">${tag.name}</div>`
    })

    console.log(window.sessionStorage.getItem("username"));
    const date = new Date();
    console.log(date.getHours());
    axios({
        method: 'GET',
        url: `https://localhost:44382/api/Question?StringFilter=${stringfilter}`,
        data: null
    }).then(function (response) {
        //handle success
        if (response.status == 204) {
			Toast.toast("Không có dữ liệu", "warning");
        } else {
            
            question_list.innerHTML = "";
            console.log(response);
            response.data.forEach(element => {
                let htmlTags = rendHTMLTag(element.tags);
                let htmlTime = rendHTMLTime(date, element.createTime)
                // element.tags
                // let arraytags = element.tags.split(" ");
    
                if (checkExistTag(tags, element.tags) == true) {
                    question_list.innerHTML = question_list.innerHTML + `
                    <div class="question-summary tag">
                        <div class="cp">
                            <div class="votes">
                                <div class="mini-counts">${element.countVote}</div>
                                <div>votes</div>
                            </div>
                            <div class="status-answer">
                                <div class="mini-counts">${element.countAnswer}</div>
                                <div>answers</div>
                            </div>
                            <div class="views">
                                <div class="mini-counts">${element.view}</div>
                                <div>views</div>
                            </div>
                        </div>
                        <div class="summary">
                            <h3><a href="#" id="${element.id}" class="question_click" name="detail_question" onclick="detailQuestion(event)">${element.title}</a></h3>
                            <div class="summary-tags">
                            `+ htmlTags + `
                                <div class="time-owner">
                                    <span>`+ htmlTime + `<a href="#" class="owner" id="${element.userId}" onclick="detailUser(event)">${element.name}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>`
                } else {
    
                    question_list.innerHTML = question_list.innerHTML + `
                    <div class="question-summary">
                        <div class="cp">
                            <div class="votes">
                                <div class="mini-counts">${element.countVote}</div>
                                <div>votes</div>
                            </div>
                            <div class="status-answer">
                                <div class="mini-counts">${element.countAnswer}</div>
                                <div>answers</div>
                            </div>
                            <div class="views">
                                <div class="mini-counts">${element.view}</div>
                                <div>views</div>
                            </div>
                        </div>
                        <div class="summary">
                            <h3><a href="#" id="${element.id}" class="question_click" name="detail_question" onclick="detailQuestion(event)">${element.title}</a></h3>
                            <div class="summary-tags">
                               `+ htmlTags + `
                                <div class="time-owner">
                                    <span>`+ htmlTime + `<a href="#" class="owner" id="${element.userId}" onclick="detailUser(event)">${element.name}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
    
            });
        }

    }).catch(function ( e) {
        console.log("đã có lỗi xảy ra");
		Toast.toast("Đã có lỗi xảy ra vui lòng tải lại trang", "error");
        
        console.log(e)
        // loadData();
    });
};


function checkExistTag(arraytaguser, arraytagquestion) {
    var exist = false;
    arraytaguser.forEach(taguser => {
        arraytagquestion.forEach(tagquestion => {
            if (tagquestion.name == taguser.name) {
                exist = true;
            }
        })

    })
    // console.log(exist);
    return exist
}
function rendHTMLTime(now, createDate) {
    let date = new Date(createDate);
    if ((now.getFullYear() - date.getFullYear()) >= 1) {
        return `asked ${now.getFullYear() - date.getFullYear()} years ago `
    }
    if (now.getMonth() - date.getMonth() >= 1) {
        return `asked ${now.getMonth() - date.getMonth()} months ago `
    }
    if (now.getDay() - date.getDay() >= 1) {
        return `asked ${now.getDay() - date.getDay()} days ago `
    }
    if (now.getHours() - date.getHours() >= 1) {
        return `asked ${now.getHours() - date.getHours()} hours ago `
    }
    if (now.getMinutes() - date.getMinutes() >= 1) {
        return `asked ${now.getMinutes() - date.getMinutes()} min ago `
    }
    if (now.getSeconds() - date.getSeconds() >= 1) {
        return `asked ${now.getSeconds() - date.getSeconds()} seconds ago `
    } else {
        return `asked 1 seconds ago `
    }
}

function rendHTMLTag(tags) {
    let listtags = ``;
    tags.forEach(tag => {
        listtags += `<a href="#" class="post-tags">${tag.name}</a>
        `
    })
    return listtags;
}

loadData();
// setUp();
// const question_click = document.getElementsByClassName("question_click");
// question_click.addEventListener('click', () => {
//     console.log("tan");
// }) 
function detailQuestion(s) {

    window.sessionStorage.setItem("questionId", s.target.id);
    window.sessionStorage.setItem("stringfilter", '');
    window.location = `http://127.0.0.1:5500/html/questiondetail.html`
    console.log("tan");
}


function detailUser(e) {
    window.sessionStorage.setItem("profileId", e.target.id);
    window.sessionStorage.setItem("stringfilter", '');
    window.location = `http://127.0.0.1:5500/html/profile.html`
    // window.sessionStorage.setItem("profileId",sessionStorage.getItem("userId"));
}



btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// const list_question_detail = document.getElementsByTagName("")


// function setUpLink() {

//     // let eventclick = document.getElementsByTagName("a");
//     var a = document.querySelectorAll('a.question_click');
//     console.log(document.querySelectorAll('a.question_click'));
//     // a.addEventListener('click', () => {
//     //     console.log("tan");
//     // }) 
// }
btn_ask_question.addEventListener('click', () => {
    window.sessionStorage.setItem("stringfilter", '');
    window.location = `http://127.0.0.1:5500/html/askquestion.html`
})

btn_add_tag.addEventListener('click', () => {
    tags = [];
    var inputElements = document.getElementsByClassName('messageCheckbox');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            let tag = {
                id: inputElements[i].id,
                name: inputElements[i].value
            }
            tags.push(tag);
        }
    }
    console.log(tags);
    modal.style.display = "none";
    watched_tag.innerHTML = "";
    tags.forEach(tag => {
        watched_tag.innerHTML += `<div class="post-tags">${tag.name}</div>`
    })
    sessionStorage.setItem('tags', JSON.stringify(tags));
    var usertag =  {
        UserId : sessionStorage.getItem("userId"),
        Tags: tags
    }
    axios({
        method: 'PUT',
        url: 'https://localhost:44382/api/User/tag',
        data: usertag
    }).then(function (response) {
        
        //handle success
        console.log(response)
    }).catch(function (response) {
        //handle error
		Toast.toast("Đã có lỗi xảy ra vui long tải lại trang", "error");

        console.log(response);
    });
        



    loadData();
})