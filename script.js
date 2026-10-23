
const amyBag = [];

function amyAdd(button, name, price) {
  amyBag.push({ name, price });
  amyRenderCart();

  button.textContent = "✓ Added!";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Add +";
    button.disabled = false;
  }, 900);
}

function amyRenderCart() {
  const list = document.getElementById("amy-cart-items");
  const empty = document.getElementById("amy-cart-empty");
  const total = document.getElementById("amy-total");

  if (!list || !total || !empty) return;

  list.replaceChildren();

  amyBag.forEach((product, index) => {
    const item = document.createElement("li");
    item.textContent =
      `${product.name} — ${product.price} MAD `;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${product.name}`);

    remove.style.marginLeft = "10px";
    remove.style.cursor = "pointer";

    remove.addEventListener("click", () => {
      amyBag.splice(index, 1);
      amyRenderCart();
    });

    item.appendChild(remove);
    list.appendChild(item);
  });

  empty.hidden = amyBag.length > 0;

  const sum = amyBag.reduce(
    (total, product) => total + product.price,
    0
  );

  total.textContent = `${sum} MAD`;
}

function amyClear() {
  amyBag.length = 0;
  amyRenderCart();
}
