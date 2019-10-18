  //Show customer info here
  //showInfo(id);
  function showInfo(id) {
    this.list.forEach((contact) => {
        console.log(contact);
        if (contact.id == id) {
            document.querySelector('#cusName').innerHTML = contact.name;
            document.querySelector('#phoneNum').innerHTML = contact.tel;
            document.querySelector('#email').innerHTML = contact.email;
            document.querySelector('#companyName').innerHTML = contact.company;
            document.querySelector('#profile_user_pic').src = contact.photo;
        }
    });
}