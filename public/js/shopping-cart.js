let panier = JSON.parse(localStorage.getItem("panier"));
if (panier == null || panier == "undefined" || panier.length == 0) {
	let empty = document.createElement("div");
	let emptyContainer =  document.querySelector("main");
	emptyContainer.classList.add("max");
	empty.classList.add('empty')
	empty.innerHTML = /*HTML*/ `<p>Le panier est vide</p>`
	emptyContainer.appendChild(empty);
}
else {
	let cart = document.createElement("section");
	cart.id = "panier";
	cart.innerHTML = /*HTML*/ `
		<div class="title">
			<h1>Panier</h1>
			<p class="total">Vous avez ${panier.length} article(s) dans votre panier</p>
		</div>
		<div class="article">
		</div>
		<div class="total">
			<p>Votre total à payer sera de : <span>0</span> €</p>
		</div>
		<div class="buy">
			<input type="button" value="Valider" class="btn-validate" >
		</div>
		<div class="cart-form">
			<h3>Formulaire de livraison</h3>
			<br />
			<form>
				<input type="text" placeholder="Nom" id="firstName" pattern="/^(([a-zA-ZÀ-ÿ]+[\s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/" required >
				<br />
				<input type="text" placeholder="Prénom" id="lastName" pattern="/^(([a-zA-ZÀ-ÿ]+[\s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/" required>
				<br />
				<input type="email" placeholder="Email" id="email" pattern="/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]{2,}.[a-z]{2,4}$/" required>
				<br />
				<input type="text" placeholder="Adresse" id="address" pattern="/^(([a-zA-ZÀ-ÿ0-9]+[\s-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,50}$/" required>
				<br />
				<input type="text" placeholder="Ville" id="city" pattern="/^(([a-zA-ZÀ-ÿ0-9]+[\s-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,50}$/" required>
				<br />
				<input type="submit" id="send">
				</form>  
		</div>`;
	
		let cartContainer = document.querySelector("main");
		cartContainer.appendChild(cart);
	
		panier.forEach((product, index) => {
			fetch("http://localhost:3000/api/teddies/" + product.id)
				.then(function (res) {
					if (res.ok) {
						return res.json();
					}
				})
				.then(function (value) {
					let object = document.createElement("div");
					object.id = "product-" + product.id + "-" + product.color.split(" ").join("_");
					object.classList.add("card");
					object.innerHTML = /*HTML*/ `
						<img src="${value.imageUrl}" alt="${value.name}">
						<div class="content">
							<h3>${value.name}</h3>
							<p>${product.color}</p>
							<form>
								<label>Quantité<label>
								<div class="range">
									<i class="fas fa-minus" id="less"></i>
									<input type="text" id="nb" value="${product.quantity}" min="1" max="99" pattern="^[0-9]*$">
									<i class="fas fa-plus" id="plus"></i>
								</div>
							</form>
							<div class="prix">
								<p>Prix : ${value.price / 100} € /u</p>
								<p>Prix total : <span>${(value.price / 100) * product.quantity	}</span> €</p>					
							</div>
						</div> 
						`;
					let objectContainer = document.querySelector(".article");
					objectContainer.appendChild(object);
					totalPrice();
	
					let productIdentifier = `#product-${product.id}-${product.color.split(" ").join("_")}`;
	
					let down = document.querySelector(`${productIdentifier} .range #less`);
					let up = document.querySelector(`${productIdentifier} .range #plus`);
					let quantityInput = document.querySelector(`${productIdentifier} #nb`);
					down.addEventListener("click", () => {
						
						if (quantityInput.value <= Number(quantityInput.min)) {
							panier.splice(index, 1);
							localStorage.setItem("panier", JSON.stringify(panier));
							window.location.reload();
							return;
						}
						quantityInput.value--;
						let total = (value.price / 100) * Number(quantityInput.value);
						let newPrice = document.querySelector(`${productIdentifier} div.prix span`);
						newPrice.innerText = total;
						totalPrice();
						panier[index].quantity = Number(quantityInput.value);
						localStorage.setItem("panier", JSON.stringify(panier));
	
					});
					up.addEventListener("click", () => {
						if (quantityInput.value >= Number(quantityInput.max)) {
							return;
						}
						quantityInput.value++;
						let total = (value.price / 100) * Number(quantityInput.value);
						let newPrice = document.querySelector(`${productIdentifier} div.prix span`);
						localStorage.setItem("panier", JSON.stringify(panier));
						newPrice.innerText = total;
						totalPrice();
						panier[index].quantity = Number(quantityInput.value);
						localStorage.setItem("panier", JSON.stringify(panier));
					});
					
					
				});
		});
		function totalPrice() {
			const subTotalContainers = document.querySelectorAll("div.prix span");
			let total = 0;
			subTotalContainers.forEach((subTotal) => {
				total = total + Number(subTotal.innerText);
			});
			const totalContainer = document.querySelector("div.total span");
			totalContainer.innerText = total;
		}
		let showForm = document.querySelector('div.buy input');
		showForm.addEventListener("click", () => {
			let form = document.querySelector('div.cart-form');
			form.classList.add("show");
			showForm.classList.add("hide");
		});
	}

let submitButton = document.querySelector('div.cart-form #send');

let regexfirstName = /^(([a-zA-ZÀ-ÿ]+[\s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
let regexlastName = /^(([a-zA-ZÀ-ÿ]+[\s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/
let regexEmail = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]{2,}.[a-z]{2,4}$/;
let regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,50}$/;
let regexCity = /^(([a-zA-ZÀ-ÿ0-9]+[\s-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,50}$/;

submitButton.addEventListener("click", (event) => {
	event.preventDefault();
	event.stopPropagation();
	let allFormInformations = {
		firstName: document.querySelector('div.cart-form #firstName').value,
		lastName: document.getElementById('lastName').value,
		email: document.getElementById('email').value,
		address: document.getElementById('address').value,
		city: document.getElementById('city').value
	}
	if (
	(!regexfirstName.test(allFormInformations.firstName)) && 
	(!regexlastName.test(allFormInformations.lastName)) && 
	(!regexEmail.test(allFormInformations.email)) && 
	(!regexAddress.test(allFormInformations.address)) && 
	(!regexCity.test(allFormInformations.city)) )

	{
		return console.log(ok);	
	}  
	else {

		let products = [];
		panier.forEach((product) => {
			for (let quantityIndex = 0; quantityIndex < product.quantity; quantityIndex++) {
				products.push(product.id);
			}			
		})
		let body = {
			contact: allFormInformations,
			products: products
		}
		fetch("http://localhost:3000/api/teddies/order", {
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(body)
			
		})
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
		})
		.then(function (value) {
			let orderId = value.orderId;
			localStorage.setItem("orderId", JSON.stringify(orderId));
			console.log(localStorage.getItem("orderId"));
			window.setTimeout(() => {
				document.location.href="./order-confirm.html";
			},1000);
		}) 
		
	}

	
});
