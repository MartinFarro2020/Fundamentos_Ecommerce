const BASE_URL = "https://services-academlo-shopping.onrender.com/"

async function getProducts(){
    try{
        const data = await fetch(BASE_URL);

        const res = await data.json();
        localStorage.setItem("products", JSON.stringify(res));

        window.localStorage.setItem("products",JSON.stringify(res));

        return res;

    } catch (error){
        console.log(error);
    }
} 
function darkmode(){
    const changeThemeHTML = document.querySelector("#icon_Them");
    changeThemeHTML.addEventListener("click", function(){
        document.body.classList.toggle("darkmode");
    })
}

function validateAmountProduct(store,id){
    if (store.cart[id].amount === store.cart[id].quantity){
        alert("Ya no hay mas en stock");
    }else{
        store.cart[id].amount++;
    }
}

function navScroll(){
    window.addEventListener("scroll",function(){
        const navBar = document.querySelector(".navbar")
        navBar.classList.toggle("move",this.window.scrollY>0);
       })
        
}

function printProducts(store){
    let html="";
    
    store.products.forEach(function({
        category,
        description,
        id,
        image,
        name,
        price,
        quantity,
    }) {
        console.log({id,image,name,price,quantity,});

        html +=`
            <div class="product">
                <div class="product_img">
                    <img src="${image}" alt=""/>
                </div>
                ${
                    quantity 
                    ? `<button class="product_btn" id="${id}">+</button>`
                    : "<div></div>"
                 }

                <h3 class="name_product">${name}</h3>
                <p>${price} - $${quantity} unidades</p>
                
                
            </div>
        `;
    });

    document.querySelector(".products").innerHTML = html;
    
}

function filterProducts(store) {


    const buttons = document.querySelectorAll('.buttons .btn')



    buttons.forEach(function (button) {


        button.addEventListener("click", function (e) {
            let filter = e.target.innerHTML
          
            main()
            if (filter == "Show All") {
                printProducts(store)
                console.log(filter)
               
                return


            } else if (filter.toLowerCase().includes("hoddie")) {
                console.log(filter)
                // main()
                const newArray = store.products.filter(product => {
                    return product.category === filter.toLowerCase();
                })

                console.log(newArray)
                store.products = newArray
                printProducts(store)
                filter = "new"
                console.log(filter)
                return

            } else if (filter.toLowerCase().includes("shirt")) {
                console.log(filter)
                // main()
                const newArray = store.products.filter(product => {
                    return product.category === filter.toLowerCase();
                })

                console.log(newArray)
                store.products = newArray
                printProducts(store)
                filter = "new"
                return

            } else if (filter.toLowerCase().includes("sweater")) {
                console.log(filter)
                // main()
                const newArray = store.products.filter(product => {
                    return product.category === filter.toLowerCase();
                })

                console.log(newArray)
                store.products = newArray
                printProducts(store)
                filter = "new"
                return
            }

            filter = "new"
            
           
        }
        )
    })
}

function handleshowcart(){
    const iconcart = document.querySelector('.icon_cart');
    const cart = document.querySelector('.cart');

    iconcart.addEventListener("click",function(){
        cart.classList.toggle("cart_show");
    });
}

function printProductsInCart(store){
    let html ="";
      for (const key in store.cart){
                const {amount, id, image, name, price, quantity} = store.cart[key];
                html +=`
                    <div class="cart_product">
                        <div class="cart_product_img">
                            <img src="${image}" alt="" />
                        </div>
                        
                        <div class="cart_product_body">
                            <p>
                                <b>${name}</b>
                            </p>
                            <p>
                                <small>Price: $${price} | <b>$${amount * price}</b></small>
                            </p>
                            <p>
                                <small>Disponibles: ${quantity}</small>
                            </p>

                            <div class="cart_product_opt" id="${id}">
                                <i class='bx bx-plus'></i>
                                <span>${amount}</span>
                                <i class='bx bx-minus'></i>
                                <i class='bx bxs-trash'></i>
                            </div>
                        </div>
                    </div>            
                `;
                console.log(store.cart[key]);
            }
            document.querySelector(".cart_products").innerHTML = html;
}

function addToCartFromProducts(store){
    const productsHTML = document.querySelector(".products");
    productsHTML.addEventListener("click",function(e){
        if(e.target.classList.contains("product_btn")){
            const id = Number(e.target.id);
            
            const productFound = store.products.find(function(product){
                return product.id === id ;
            });
            
            if(store.cart[productFound.id]){
                validateAmountProduct(store,productFound.id);
            }else{
                store.cart[productFound.id]={
                    ...productFound,
                    amount:1,
                };
            }
              const btnOpenModal = document.querySelector(".products");
              const btnCloseModal = document.querySelector("#btn_close_modal");
              const modal = document.querySelector("#modal");
    
             btnOpenModal.addEventListener("click",function (e){
              if(e.target.classList.contanis("name_product")){
                modal.showModal();  
                return
              }
             })

            localStorage.setItem("cart",JSON.stringify(store.cart));

              

            btnCloseModal.addEventListener("click",()=>{
             modal.close();
            })
            printProductsInCart(store);
            printTotal(store); 
         }
    });
}

function printTotal(store){
    let totalProducts = 0;
    let totalPrice = 0;

    for (const key in store.cart) {
        const { amount, price } = store.cart[key];
    
        totalProducts += amount;
        totalPrice += amount * price;

    }
        document.querySelector("#totalProducts").textContent = totalProducts;
        document.querySelector("#totalPrice").textContent = totalPrice;
        document.querySelector(".ball").textContent=totalProducts;
    }

function handlecart(store){
    document.querySelector(".cart_products").addEventListener("click", function (e) {
            if (e.target.classList.contains("bx")) {  
                if(e.target.classList.contains("bx-minus")){
                    const id = Number(e.target.parentElement.id);
                    if(store.cart[id].amount === 1){
                        const response = confirm("Seguro quieres eliminar")
                        if (response) delete store.cart[id];
                    }else{
                        store.cart[id].amount--;
                    }    
                }

                if (e.target.classList.contains("bx-plus")){
                    const id = Number(e.target.parentElement.id);
                    validateAmountProduct(store,id);   
                    
                }

                if (e.target.classList.contains("bxs-trash")){
                    const id = Number(e.target.parentElement.id);
                    const response = confirm("Seguro quieres eliminar?")
                    if (response) delete store.cart[id];
                }
                localStorage.setItem("cart",JSON.stringify(store.cart));
                printProductsInCart(store);
                printTotal(store);
            }

    });
}

function handleTotal(store){
    document.querySelector(".btn_buy").addEventListener("click",function(){
        if(!Object.values(store.cart).length)
            return alert("Primero debes elegir algo");

        const response = confirm("Seguro que quieres comprar");
        if (!response) return;


        const newarray = [];

        store.products.forEach((product) => {
            if (store.cart[product.id]){
                newarray.push({
                    ...product,
                    quantity: product.quantity - store.cart[product.id].amount,
                });
            }else{
                newarray.push(product);
            }
        });

        store.products = newarray;
        store.cart = {};

        localStorage.setItem("products", JSON.stringify(store.products));
        localStorage.setItem("cart",JSON.stringify(store.cart));
        printProducts(store);
        printProductsInCart(store);
        printTotal(store);
    });
}
async function main(){
    const res = JSON.parse(window.localStorage.getItem("products")) || (await getProducts());
    const store = {
        products: JSON.parse(localStorage.getItem("products")) || (await getProducts()),
        cart: JSON.parse(localStorage.getItem("cart")) || {},
    };

    printProducts(store);
    filterProducts(store);
    darkmode();
    navScroll()
    handleshowcart();
    addToCartFromProducts(store);
    printProductsInCart(store);
    handlecart(store); 
    printTotal(store);  
    handleTotal(store); 
    


    const btnOpenModal = document.querySelector(".name_product");
    const btnCloseModal = document.querySelector("#btn_close_modal");
    const modal = document.querySelector("#modal");
    
    btnOpenModal.addEventListener("click",(e)=>{
        modal.showModal();
    })

    btnCloseModal.addEventListener("click",()=>{
        modal.close();
    })
    
}
main();

// (async () => {
//     const res = await getProducts();
//     console.log(res);
// })();