const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("mail");
const userid = document.getElementById("userid");
const printForm = document.getElementById("user");
const display = document.getElementById("form-result");
const handlePrint = (e) => {
    e.preventDefault(); // 창이 이동하는 것을 막아줌
    const fn = firstName.value;
    const ln = lastName.value;
    const em = email.value;
    const id = userid.value;
    const diplaySpan = display.querySelector("span"); // id가 form-result인 태그 내부의 span 태그 선택
    diplaySpan.innerHTML = `
        First Name is: ${fn}<br>
        Last Name is: ${ln}<br>
        E-mail is: ${em}<br>
        ID is: ${id}`;
};
printForm.addEventListener("submit", handlePrint);