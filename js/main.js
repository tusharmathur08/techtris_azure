$(document).ready(function() {
  let filter = {
    all: "all",
    popular: "popular",
    five: "five",
    four: "four",
    three: "three",
    tfive: "tfive"
  };
  let city = {
    akhota: function() {
      filterCity("Akota");
    },
    nodata: function() {
      filterCity("non");
    }
  };
  let a = [];
  var api = "http://morning-cliffs-75850.herokuapp.com/food-stores";
  let rapi = "";

  var t = sessionStorage.getItem("userdata");
  let tmp1 = JSON.parse(t);

  console.log(tmp1);
  filterAll();
  $(".all").addClass("act");

  $(".filter").on("click", e => {
    let x = e.currentTarget.classList;
    x = jQuery.map(x, function(n, i) {
      return filter[n];
    });

    if (x == "all") {
      filterAll();
    } else if (x == "five") {
      filterPopular();
    } else if (x == "five") {
      rapi = "http://morning-cliffs-75850.herokuapp.com/filter-ratings/5";
      filterRating();
    } else if (x == "four") {
      rapi = "http://morning-cliffs-75850.herokuapp.com/filter-ratings/4";
      filterRating();
    } else if (x == "three") {
      rapi = "http://morning-cliffs-75850.herokuapp.com/filter-ratings/3";
      filterRating();
    } else if (x == "two") {
      rapi = "http://morning-cliffs-75850.herokuapp.com/filter-ratings/2";
      filterRating();
    }
    console.log(x);

    // work remove bg

    $(".filter").removeClass("act");
    $(e.currentTarget).addClass("act");
  });

  $(".city").change(function() {
    if ($(this).val() == "akhota") {
      city.akhota();
    } else {
      city.nodata();
    }
  });

  function filterAll() {
    $.getJSON(api, function(data) {
      console.log(data);
      let html = "";
      for (let i = 0; i < data.length; i++) {
        link = "../css/img/food.jpeg";
        html += `
        <div class="col-md-4 mt-4">
        <div class="product">
          <img src="css/img/food.jpeg" class="img-fluid" alt="" />
  
          <h2 class="product-new-top">Veg</h2>
          <div class="item-info-product">
            <h4 class="mt-3">${data[i].shop_name} </h4>
           <h6 class="pt-2">Available</h6>  
            <div class="grid-price mt-2">
              <span class="money" style="background:#2ecc71; color:#fff; padding:2px; font-size:12px">
              <i class="fas fa-star"></i>
              4.5</span>.
              <span class="money">20 Min</span>.
              <span class="money ">200 Rs.</span>
            </div>
          </div>
          <div class="l-product mt-2" ">
            <a href = "./cart.html" class="link-product" id="${
              data[i].shop_id
            }">
            Qick view </a> 
          </div>
        </div>
      </div>
        `;
      }

      $(".items").html(html);
    });
  }
  function filterPopular() {
    $.getJSON(api, function(data) {
      console.log(data);
      let html = "";
      for (let i = 0; i < data.length; i++) {
        link = "../css/img/food.jpeg";
        html += `
        <div class="col-md-4 mt-4">
        <div class="product">
          <img src="css/img/food.jpeg" class="img-fluid" alt="" />
  
          <h2 class="product-new-top">Veg</h2>
          <div class="item-info-product">
            <h4 class="mt-3">${data[i].shop_name} </h4>
           <h6 class="pt-2">Available</h6>  
            <div class="grid-price mt-2">
              <span class="money" style="background:#2ecc71; color:#fff; padding:2px; font-size:12px">
              <i class="fas fa-star"></i>
              4.5</span>.
              <span class="money">20 Min</span>.
              <span class="money ">200 Rs.</span>
            </div>
          </div>
          <div class="l-product mt-2" ">
            <a href = "./cart.html" class="link-product" id="${
              data[i].shop_id
            }">
            Qick view </a> 
          </div>
        </div>
      </div>
        `;
      }

      $(".items").html(html);
    });
  }
  function filterCity(arg) {
    $.getJSON(
      "http://morning-cliffs-75850.herokuapp.com/filter-location/" + arg,
      function(data) {
        console.log(data);
        let html = "";
        for (let i = 0; i < data.length; i++) {
          link = "../css/img/food.jpeg";
          html += `
        <div class="col-md-4 mt-4">
        <div class="product">
          <img src="css/img/food.jpeg" class="img-fluid" alt="" />
  
          <h2 class="product-new-top">Veg</h2>
          <div class="item-info-product">
            <h4 class="mt-3">${data[i].shop_name} </h4>
           <h6 class="pt-2">Available</h6>  
            <div class="grid-price mt-2">
              <span class="money" style="background:#2ecc71; color:#fff; padding:2px; font-size:12px">
              <i class="fas fa-star"></i>
              4.5</span>.
              <span class="money">20 Min</span>.
              <span class="money ">200 Rs.</span>
            </div>
          </div>
          <div class="l-product mt-2" ">
            <a href = "./cart.html" class="link-product" id="${
              data[i].shop_id
            }">
            Qick view </a> 
          </div>
        </div>
      </div>
        `;
        }

        $(".items").html(html);
      }
    );
  }
  function filterRating() {
    $.getJSON(rapi, function(data) {
      console.log(data);
      let html = "";
      for (let i = 0; i < data.length; i++) {
        link = "../css/img/food.jpeg";
        html += `
        <div class="col-md-4 mt-4">
        <div class="product">
          <img src="css/img/food.jpeg" class="img-fluid" alt="" />
  
          <h2 class="product-new-top">Veg</h2>
          <div class="item-info-product">
            <h4 class="mt-3">${data[i].shop_name}</h4>
           <h6 class="pt-2">Available</h6>  
            <div class="grid-price mt-2">
              <span class="money" style="background:#2ecc71; color:#fff; padding:2px; font-size:12px">
              <i class="fas fa-star"></i>
              4.5</span>.
              <span class="money">20 Min</span>.
              <span class="money ">200 Rs.</span>
            </div>
          </div>
          <div class="l-product mt-2" ">
            <a href = "./cart.html" class="link-product" id="${
              data[i].shop_id
            }">
            Qick view </a> 
          </div>
        </div>
      </div>
        `;
      }

      $(".items").html(html);
    });
  }

  if (tmp1 !== null) {
    $(".userlogout").removeClass("non");
    $(".userlogin").addClass("non");
    $(".username").html(tmp1.username);
  } else {
    $(".userlogout").addClass("non");
    $(".userlogin").removeClass("non");
  }

  $(".items").on("click", function(e) {
    let data = [];
    let a = {
      id: e.target.id,
      img: e.target.parentElement.parentElement.children[0].src,
      sname:
        e.target.parentElement.parentElement.children[2].children[0].textContent
    };
    data.push(a);

    sessionStorage.setItem("s_id", JSON.stringify(data));
  });
});
