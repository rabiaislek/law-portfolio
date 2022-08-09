jQuery(document).ready(function($) {
  "use strict";
  
  //Contact
  $('form.contactForm').submit(function() {

console.log("islem gerceklesti")

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');


      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
      
    });
    return false;
  });

});
 


// Mesaji localstorage e kaydetme ve alert

// const obj = {
//   name: "",
//   email: "",
//   subject: "",
//   message: "",
// }

// // const myJSON = JSON.stringify(obj);
// let formDOM = document.querySelector("#userForm");
// formDOM.addEventListener('submit', formSubmit);
// const alertDOM = document.querySelector('#alert')

// const alertFunction = (value) => `
// <div class="alert alert-warning alert-dismissible fade show" role="alert">
// <strong>tebrikler</strong> ${value}
// <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//   <span aria-hidden="true">&times;</span>
// </button>
// </div>
// `

// function formSubmit(event) {
//   console.log("form submit event", event);
//   event.preventDefault();
//   console.log("islem");
//   // let obj = document.querySelector('#userForm')
//   // localStorage.setItem('userForm', JSON.stringify(obj));

//   let bilgiDOM = document.querySelector("#name");
//   console.log('bilgidom', bilgiDOM)
//   console.log('bilgidom val', bilgiDOM.value)
//   localStorage.setItem("name", JSON.stringify(bilgiDOM.value));
//   let bilgiDOM2 = document.querySelector("#email");
//   localStorage.setItem("email", JSON.stringify(bilgiDOM2.value));
//   let bilgiDOM3 = document.querySelector("#subject");
//   localStorage.setItem("subject", JSON.stringify(bilgiDOM3.value));
//   let bilgiDOM4 = document.querySelector("#message");
//   localStorage.setItem("message", JSON.stringify(bilgiDOM4.value));

 
//   obj.name = bilgiDOM.value;
//   obj.email = bilgiDOM2.value;
//   obj.subject = bilgiDOM3.value;
//   obj.message = bilgiDOM4.value;

//    localStorage.setItem("obj", JSON.stringify(obj));

// if (bilgiDOM.value && bilgiDOM2.value && bilgiDOM3.value && bilgiDOM4.value) {

//   alertDOM.innerHTML = alertFunction ( `${bilgiDOM.value} ${bilgiDOM2.value} ${bilgiDOM3.value} ${bilgiDOM4.value}"Mesajiniz alindi. Tesekkur ederiz."`)

// }

//   //  const myJSON = JSON.stringify(mobj);
//   //  localStorage.setItem("testJSON", myJSON)
//   //  let text = localStorage.getItem("testJSON");
//   //  let obj = JSON.parse(text);
//   //  document.getElementById("name").innerHTML = obj;
// }

