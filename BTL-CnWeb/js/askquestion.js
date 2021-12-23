const input_title = document.getElementById("input-title")
const input_content = document.getElementById("question-content")
const input_tags = document.getElementById("input-tags")
const btn_ask_question = document.getElementById("btn-ask-question");
var tagquestions = [];
window.sessionStorage.setItem("profileId",sessionStorage.getItem("userId"));
btn_ask_question.addEventListener('click', () => {
    let title = input_title.value;
    let content = input_content.value;
    tagquestions = checkExistTag();
    if (title == null || title == "") {
        Toast.toast("Hãy nhập Title", "warning");

        // alert("Mời nhập title")
    } else if (content == null || content == "") {
        // alert("Mời nhập content")
        Toast.toast("Hãy nhập Content", "warning");

    } else if (tagquestions.length == 0) {
        Toast.toast("Hãy nhập Tags", "warning");

        // alert("Mời nhập tags")
    } else {
        // call api post question

        var question = {
            Title: title,
            Content: content,
            Tags: tagquestions,
            UserId: window.sessionStorage.getItem('userId'),
        }
        axios({
            method: 'POST',
            url: 'https://localhost:44382/api/Question',
            data: question
        }).then(function (response) {
            //handle success
            console.log(response)
            if (response.data.isValid == true && response.status == 200) {
                console.log("thanh cong");
                Toast.toast("Thêm câu hỏi thành công", "success");
                window.location = `http://127.0.0.1:5500/html/home.html`
            } else {
                alert(response.data.message);
            }
        }).catch(function (response) {
            //handle error
            Toast.toast("Đã có lỗi xảy ra vui lòng tải lại trang", "error");


            // alert("Đã có lỗi xảy ra vui long đăng tải lại");
            console.log(response);
        });
    }
})

function checkExistTag() {
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
    return tags;
}