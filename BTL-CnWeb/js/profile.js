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
var nameModal = ""
var descriptionModal = "";
var tagsModal = [];
function loadData() {
    var profileId = window.localStorage.getItem("profileId");
    if (profileId != localStorage.getItem("userId")) {
        open_edit_profile.style.display = "none";
    }
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
        tagsModal = response.data.tags;
        response.data.tags.forEach(tag => {
            user_tags.innerHTML += `<a href="#" class="tag">${tag.name}</a>`
        })


    }).catch(function () {
        console.log("đã có lỗi xảy ra");
        loadData();
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
        alert("Hãy nhập đủ Name");
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
            Id: localStorage.getItem("userId"),
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
            console.log(response)
            loadData();
            modal.style.display = "none";
        }).catch(function (response) {
            //handle error
            alert("Đã có lỗi xảy ra vui long đăng nhập lại");
            console.log(response);
        });

    }

})


loadData();

// modal.style.display = "block";
