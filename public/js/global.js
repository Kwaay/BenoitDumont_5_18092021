function totalPrice() {
    const subTotalContainers = document.querySelectorAll("div.prix span");
    let total = 0;
    subTotalContainers.forEach((subTotal) => {
        total = total + Number(subTotal.innerText);
    });
    const totalContainer = document.querySelector("div.total span");
    totalContainer.innerText = total;
}
