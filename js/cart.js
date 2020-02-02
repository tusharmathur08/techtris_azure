$(document).ready(function() {
  let s_id = sessionStorage.getItem("s_id");
  let temp = JSON.parse(s_id);

  if (temp === null) {
    window.location.href = "/option.html";
  }
  var t = sessionStorage.getItem("userdata");
  let tmp1 = JSON.parse(t);
  console.log(tmp1);

  let payment_id = null;
  if (tmp1 !== null) {
    $(".userlogout").removeClass("non");
    $(".userlogin").addClass("non");
    $(".username").html(tmp1.username);
  } else {
    $(".userlogout").addClass("non");
    $(".userlogin").removeClass("non");
  }

  console.log(temp);
  $("#shop").html(`
  <div class="container">
  <div class="row">
      <div class="col-md-3 mt-4">
          <div class="product">
          </div>
      </div>
          <div class="col-md-6">
            <h1 class="mt-3">${temp[0].sname}</h1>
            <h6 class="pt-3" style="color:green">Available</h6>

              <div class="grid-price mt-4">
                <p class="money ">4.5 <br><span>Rating</span></p>.
                <p class="money ">20 Min <br> <span>Arrival Time</span></p>.
                <p class="money ">200 Rs. <br> <span>Avg Cost.</span></p>
              </div>

          </div>
        </div>
  </div>
</div>`);

  var api =
    "http://morning-cliffs-75850.herokuapp.com/food-items/" + temp[0].id;
  let link;
  let summ = "";

  $.getJSON(api, function(data) {
    console.log(data);
    let html = "";
    for (let i = 0; i < data.length; i++) {
      if (i > 7) {
        html += `

        <div class="col-md-12 col-11 product-men mt-2">
        <div class="men-pro-item simpleCart_shelfItem pb-0" style="box-shadow:0 0 0 ">
          <div class="item-info-product mt-0" >
              <h5 class="pt-1 text-left">${data[i].item_name}</h5>
              <div class="info-product-price text-left pt-0" style="float:left">
                <span class="item_price pt-5">$45.99</span> <del>$69.71</del>
              </div>
            
            <div
              class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2 " style="margin-top:-25px;    position: relative;
              top: 5px;
              right: -25%;"
            >
              <input
                type="submit"
                name="submit"
                value="Add to cart"
                class="btn btn-success"
              />
            </div>
            </div>
        </div>
        <hr/>
        </div>
        `;
      } else {
        html += `
        <div class="col-md-4 col-6 product-men">
        <div class="men-pro-item simpleCart_shelfItem">
          <div class="men-thumb-item">
            <img src="css/img/food.jpeg" alt="" class="pro-image-front" />
          </div>
          <div class="item-info-product ">
            <h4>${data[i].item_name}</h4>
            <div class="info-product-price">
              <span class="item_price">$45.99</span> <del>$69.71</del>
            </div>
            <div
              class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2"
            >
              <input
                type="submit"
                name="submit"
                value="Add to cart"
                class="btn btn-success"
              />
            </div>
          </div>
        </div>
      </div>
`;
      }
    }
    $(".tab1").html(html);
  });

  let tt = sessionStorage.getItem("cartitem");
  let cdata = JSON.parse(tt);

  let data = [];
  let iprice = 0,
    ivalue = 0;
  if (cdata !== null) {
    $(".summary").removeClass("non");

    for (let i = 0; i < cdata.length; i++) {
      data.push(cdata[i]);
      summ += `
      <div class="row">

       <div class="subtotal-title col-7"  style="font-size:12px;padding:0">${
         cdata[i].name
       }</div>
       <div class="count col-2"> 1</div>
            <div class="col-1 exit px-0 mx-0" style="background:#fa8334;cursor:pointer">
              <p style="color:red;font-weight:900;font-size:13px;text-align:center">X</p>
            </div>
          <div class="subtotal-value final-value col-2" id="basket-subtotal">
              <span class="ivalue pr-0">${cdata[i].price}</span>
              <span class="tvalue"></span>
            </div>
        </div>
      <hr>

            `;
      ivalue = cdata.length;
      iprice += Number(cdata[i].price);
    }

    $(".summary-subtotal").html(summ);
    $("#basket-total .fvalue").html(iprice.toFixed(2));
    $("#basket-total .ivalue").html("x " + ivalue.toFixed(0));
  }

  $(".tab1").on("click", function(e) {
    if (e.target.classList.contains("item_add")) {
      $(".summary").removeClass("non");
      let a = {
        name: e.target.parentElement.children[0].textContent,
        price: e.target.parentElement.children[1].children[0].textContent.slice(
          1
        )
      };

      data.push(a);
      sessionStorage.setItem("cartitem", JSON.stringify(data));

      let t = sessionStorage.getItem("cartitem");
      let cdata = JSON.parse(t);
      console.log(cdata.length);

      summ += `
      <div class="row">

      <div class="subtotal-title col-7"  style="font-size:12px;padding:0">${
        a.name
      }</div>
      <div class="count col-2"> 1</div>
           <div class="col-1 exit px-0 mx-0" style="background:#fa8334;cursor:pointer">
             <p style="color:red;font-weight:900;font-size:13px;text-align:center">X</p>
           </div>
         <div class="subtotal-value final-value col-2" id="basket-subtotal">
             <span class="ivalue pr-0">${a.price}</span>
             <span class="tvalue"></span>
           </div>
       </div>
     <hr>
            `;
      // console.log(summ);
      iprice += Number(a.price);
      ivalue += Number(1);

      $(".summary-subtotal").html(summ);
    }
    $("#basket-total .ivalue").html("x " + ivalue.toFixed(0));

    $("#basket-total .fvalue").html(iprice.toFixed(2));
  });

  $(document.body).on("click", ".exit", function(e) {
    console.log("click");
    delete_item(e);
  });
  // $(".exit").on("click", function(e) {
  // });

  $(".summary-checkout button").on("click", function() {
    if (tmp1 === null) {
      alert("please login first!");
      window.location.href = "/signup.html";
    } else {
      let a = {};
      // [
      //   {
      //   "user_id": 1,
      //   "username": "vivekpadia",
      //   "password": "vivekpadia",
      //   "email": "vivekpadia70@gmail.com",
      //   "area": "Akota"
      //   },
      //   {
      //   "item_id": 1,
      //   "item_name": "Hakka Noodles",
      //   "item_price": 100,
      //   "shop_id": 1,
      //   "shop_name": "Vijay China Town"
      //   },
      //   {
      //   "item_id": 2,
      //   "item_name": "Chowmein With Gravy",
      //   "item_price": 120,
      //   "shop_id": 1,
      //   "shop_name": "Vijay China Town"
      //   }
      //   ]
      a = {
        user_id: 1,
        payment_id: null,
        amount: 50,
        items: [
          {
            item_id: 1,
            item_name: "Hakka Noodels",
            item_price: 100,
            shop_id: 1,
            shoo_name: "Vijay"
          }
        ]
      };
      console.log(a);

      $.ajax({
        type: "POST",
        url: "https://morning-cliffs-75850.herokuapp.com/set-order",
        data: a,

        processData: false,
        success: function(data) {
          console.log("data");

          // $("#save_message").html(data.message);
        },
        error: function(err) {
          console.log(err);

          // $("#save_message").html(data.message);
        }
      });
    }
  });

  function delete_item(e) {
    let iname = e.target.parentElement.parentElement.children[0].textContent;
    console.log("a" + iname);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name);
      if (iname == data[i].name) {
        var index = data.findIndex(x => x.name == data[i].name);

        if (index > -1) {
          data.splice(index, 1);
        }
        console.log(index);
        console.log("delete" + data);

        sessionStorage.setItem("cartitem", JSON.stringify(data));
        location.reload(true);
        break;
      }
    }
  }
});
