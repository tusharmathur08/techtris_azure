$(document).ready(function() {
  let a = [];
  var api = "http://morning-cliffs-75850.herokuapp.com/food-stores";
  let link;

  $.getJSON(api, function(data) {
    console.log(data);
    let html = "";
    for (let i = 0; i < data.length; i++) {
      link = "../imges/food.jpeg";
      html += `
      <div class="col-md-4 mt-4">
      <div class="product">
        <img src="images/food.jpeg" class="img-fluid" alt="" />

        <span class="product-new-top">New</span>
        <div class="item-info-product">
          <h3 class="mt-3">${data[i].shop_name}</h3>
         <h6 class="pt-1">Available</h6>  
          <div class="grid-price mt-1">
            <span class="money ">4.5</span>.
            <span class="money">20 Min</span>.
            <span class="money ">200 Rs.</span>
          </div>
        </div>
        <div class="l-product mt-2" ">
          <a href = "./item.html" class="link-product" id="${data[i].shop_id}">
          Qick view </a> 
        </div>
      </div>
    </div>
      `;
    }

    $(".items").html(html);
  });
  $(".items").on("click", function(e) {
    let data = [];
    let a = {
      id: e.target.id,
      img: e.target.parentElement.parentElement.children[0].src,
      sname:
        e.target.parentElement.parentElement.children[2].children[0].textContent
    };
    data.push(a);
    // alert("d" + data);

    sessionStorage.setItem("s_id", JSON.stringify(data));
  });
});
