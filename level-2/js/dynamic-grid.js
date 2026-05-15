async function fetchApiData() {
    try {
        skeletonPlaceholder();
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(error);
    }
}

function skeletonPlaceholder() {
    const cardsContainer = document.querySelector("#cards-container");
    for (let i = 0; i <= 3; i++) {
        const skeleton = document.createElement("div");
        skeleton.classList.add("flex", "flex-row", "justify-between");
        skeleton.innerHTML = `
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 animate-pulse">
  <div
    class="relative grid h-56 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      class="w-12 h-12 text-gray-500">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
      </path>
    </svg>
  </div>
  <div class="p-6">
    <div
      class="block w-56 h-3 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      class="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      class="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      class="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      class="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
  </div>
  <div class="p-6 pt-0">
    <button disabled="" tabindex="-1"
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
      type="button">
      &nbsp;
    </button>
  </div>
</div>
    `;
        cardsContainer.appendChild(skeleton);
    }
}

async function displayProducts(products) {
    rerender();

    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add(
            "rounded-3xl",
            "border-2",
            "shadow-xl",
            "border-gray-300",
            "bg-white",
            "px-4",
            "flex",
            "flex-col",
            "justify-end",
            "hover:transition",
            "hover:scale-105",
            "hover:shadow-2xl",
        );
        div.innerHTML = `
                    <div class="w-full h-1/2 object-contain">
                        <img
                            class="w-full h-full rounded-2xl "
                            src="${product.image}"
                            alt=""
                        />
                    </div>
                    <h2 class="my-6 text-2xl line-clamp-2 font-extrabold">${product.title}</h2>
                    <div class="flex justify-between">
                        <h3 class="font-semibold text-3xl text-green-500">$${product.price}</h3>
                        <p class="rounded-lg border text-center border-blue-50 py-2 px-3 text-xs text-blue-400 bg-blue-100">${product.category}</p>
                    </div>
                    <button class="text-center block py-4 my-6 rounded-lg w-full border transition bg-blue-400 text-white text-xl hover:bg-blue-600">Buy</button>
        `;

        document.querySelector("#cards-container").appendChild(div);
    });
}

async function filterByCategory(results) {
    let categories = results.map(product => {
        return product.category;
    });

    categories.push("all");

    categories = new Set(categories);

    for (const category of categories) {
        const categoryButton = document.createElement("button");
        categoryButton.classList.add(
            "border",
            "border-black",
            "px-2",
            "mb-4",
            "lg:mb-0",
            "hover:bg-gray-100",
        );
        categoryButton.setAttribute("data-id", category);
        categoryButton.textContent = `${category}`;

        document
            .querySelector("#filters")
            .firstElementChild.firstElementChild.appendChild(categoryButton);
    }

    const categoryBtns = document
        .querySelector("#filters")
        .querySelectorAll("button");

    categoryBtns.forEach(categoryBtn => {
        categoryBtn.addEventListener("click", e => {
            const category = e.target.dataset.id;
            const productCategory = results.filter(product => {
                if (product.category === category) {
                    return product;
                }
            });

            console.log(category);

            if (category === "all") {
                rerender();
                displayProducts(results);
            } else {
                rerender();
                displayProducts(productCategory);
            }
        });
    });
}

function rerender() {
    const cardsContainer = (document.querySelector(
        "#cards-container",
    ).textContent = "");
}

async function search(e) {
    const results = await fetchApiData();
    const searchInput = e.target.value.toLowerCase();
    const searchResults = results.filter(product =>
        product.title.toLowerCase().includes(searchInput),
    );
    const container = document.querySelector("#cards-container");
    if (searchResults.length === 0 || !e.target.value === null) {
        container.innerHTML = "";
        container.innerHTML =
            '<div class="text-center text-xl">Product not found</div>';
        console.log(container);
        return;
    } else {
        displayProducts(searchResults);
    }
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}

async function init() {
    const results = await fetchApiData();
    const debouncedSearch = debounce(search, 300);
    filterByCategory(results);
    displayProducts(results);
    document.querySelector("#search").addEventListener("input", e => {
        debouncedSearch(e);
    });
}

document.addEventListener("DOMContentLoaded", init);
