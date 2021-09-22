fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let i = 0; i < value.length; i++) {
      console.log(value[i]);
    let teddy = document.createElement("a");
    teddy.href = "product.html?id="+ value[i]._id
    teddy.classList.add('border-gradient');
    teddy.innerHTML = '<div class="module"><img src="' + value[i].imageUrl + '" alt="' + value[i].name + '"></div><div class="specs"><p>' + value[i].name + '</p><span>Prix : ' + value[i].price + ' €</span></div>';
    let teddycontainer = document.getElementById("products");
    teddycontainer.appendChild(teddy);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
    

