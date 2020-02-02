$(document).ready(function() {
  $("#signup").click(function() {
    email = $("#user_id").val();
    username = $("#username").val();
    password = $("#user_pass").val();
    area = $("#user_area").val();
    console.log();

    if (email == "" || username == "" || password == "" || area == "") {
      alert("Please Fill all the Fields");
    } else if (password.length < 6) {
      $(".signup-error").html(`
      <div class="alert alert-success alert-dismissible fade show" role="alert">
      password length less than 6
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
      `);
    } else {
      url =
        "https://morning-cliffs-75850.herokuapp.com/signup?username=" +
        username +
        "&password=" +
        password +
        "&email=" +
        email +
        "&area=" +
        area;
      $.post(url, function(data) {
        console.log(data);

        console.log("signup successful");
        if (data == " email already exists") {
          //email exists error!!!!!!
          $(".signup-error").html(`
          <div class="alert alert-success alert-dismissible fade show" role="alert">
          email already exists
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `);
          console.log(data);
        } else {
          alert("signup successful Please Login To your Account");
          var user = JSON.parse(data);
          console.log(email);
          $.session.set("email", email);
          this.user = data;
          newUrl = $(location)
            .attr("href")
            .replace("signup.html", "login.html");
          window.location = newUrl;
        }
      });
    }
  });
  $("#login").click(function() {
    email = $("#userid").val();
    password = $("#userp").val();
    url =
      "https://morning-cliffs-75850.herokuapp.com/login?email=" +
      email +
      "&password=" +
      password;
    $.get(url, function(data) {
      console.log(data);
      if (data == " false") {
        $(".login-error").html(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
      incorrect email or password
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        `);
        console.log(data);
      } else {
        var user = JSON.parse(data);
        alert("welcome " + user.username);
        sessionStorage.setItem("userdata", JSON.stringify(user));
        console.log(user.email);
        $.session.set("email", user.email);
        this.user = data;
        newUrl = $(location)
          .attr("href")
          .replace("login.html", "option.html");
        window.location = newUrl;
      }
    });
  });
  $("#logout").click(function() {
    $.session.clear();
    newUrl = $(location)
      .attr("href")
      .replace("option.html", "index.html");

    window.location = newUrl;
  });
  var username = $.session.get("email");
  $("#loggedUser").html(username);
});
