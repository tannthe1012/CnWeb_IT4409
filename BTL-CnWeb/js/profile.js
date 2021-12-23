const user_name = document.getElementById("user-name");
const user_email = document.getElementById("user-email");
const user_description = document.getElementById("user-description");
const user_count_answer = document.getElementById("user-count-answer");
const user_count_question = document.getElementById("user-count-question");
const user_tags = document.getElementById("user-tags");
const modal = document.getElementById("myModal");
const open_edit_profile = document.getElementById("open-edit-profile");
const span = document.getElementsByClassName("close")[0];
const btn_save_edit = document.getElementById("btn-save");
const user_name_edit = document.getElementById("user-name-edit");
const description_edit = document.getElementById("description-edit")
const owner_question = document.getElementById("owner-questions");
const profile_content = document.getElementById('profile-content');
const my_question = document.getElementById("my-questions");
const btn_show_profile = document.getElementById("btn-show-profile");
var nameModal = ""
var descriptionModal = "";
var tagsModal = [];
function loadData() {
    var profileId = window.sessionStorage.getItem("profileId");
    if (profileId != sessionStorage.getItem("userId")) {
        open_edit_profile.style.display = "none";
    }
    const date = new Date();
    axios({
        method: 'GET',
        url: `https://localhost:44382/api/User/${profileId}`,
        data: null
    }).then(function (response) {
        console.log(response);

        user_name.innerHTML = response.data.name;
        user_email.innerHTML = response.data.username;
        user_description.innerHTML = response.data.description;
        user_count_answer.innerHTML = response.data.countAnswer;
        user_count_question.innerHTML = response.data.countQuestion;
        nameModal = response.data.name;
        descriptionModal = response.data.description;
        user_tags.innerHTML = "";
        my_question.innerHTML = "";
        tagsModal = response.data.tags;
        if (tagsModal.length > 0) {
            response.data.tags.forEach(tag => {
                user_tags.innerHTML += `<a href="#" class="tag">${tag.name}</a>`
            })
        }
        if (response.data.questions.length > 0) {
            response.data.questions.forEach(element => {
                let htmlTags = rendHTMLTag(element.tags);
                let htmlTime = rendHTMLTime(date, element.createTime)
                
                my_question.innerHTML = my_question.innerHTML + `
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
                                <span>`+ htmlTime + `</span>
                            </div>
                        </div>
                    </div>
                </div>`
            })
        }




    }).catch(function (e) {
        console.log(e);
        Toast.toast("Đã có lỗi xảy ra vui lòng tải lại trang", "error");

        // loadData();
    });
}

function rendHTMLTag(tags) {
    let listtags = ``;
    let arraytags = tags.split(" ");
    arraytags.forEach(tag => {
        listtags += `<a href="#" class="post-tags">${tag}</a>
        `
    })
    return listtags;
}
open_edit_profile.addEventListener('click', () => {
    profile_content.style.display = 'block';
    my_question.style.display = "none";
    btn_show_profile.classList.add("active");
    owner_question.classList.remove("active");
    modal.style.display = "block";
    user_name_edit.value = nameModal;
    description_edit.value = descriptionModal
    var inputElements = document.getElementsByClassName('messageCheckbox');
    tagsModal.forEach(tag => {

        for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].value == tag.name) {
                inputElements[i].checked = true;
            }
        }
    })
})
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
btn_save_edit.addEventListener('click', () => {
    if (user_name_edit.value == null || user_name_edit == "") {
        Toast.toast("Hãy điền đủ name", "error");
    } else {
        var tags = [];
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



        var user = {
            Id: sessionStorage.getItem("userId"),
            Name: user_name_edit.value,
            Description: description_edit.value,
            Tags: tags
        }
        axios({
            method: 'PUT',
            url: 'https://localhost:44382/api/User',
            data: user
        }).then(function (response) {
            //handle success
            Toast.toast("Sửa thông tin thành công", "success");

            console.log(response)
            loadData();
            modal.style.display = "none";
        }).catch(function (response) {
            //handle error
            Toast.toast("Đã có lỗi xảy ra vui lòng tải lại trang", "error");

            console.log(response);
        });

    }

})
owner_question.addEventListener('click', () => {
    profile_content.style.display = 'none';
    my_question.style.display = "block"
    btn_show_profile.classList.remove("active");
    owner_question.classList.add("active");
})
btn_show_profile.addEventListener('click', () => {
    profile_content.style.display = 'block';
    my_question.style.display = "none";
    btn_show_profile.classList.add("active");
    owner_question.classList.remove("active");
})
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
function detailQuestion(s) {

    window.sessionStorage.setItem("questionId", s.target.id);
    window.sessionStorage.setItem("stringfilter", '');
    window.location = `http://127.0.0.1:5500/html/questiondetail.html`
    console.log("tan");
}
// modal.style.display = "block";
