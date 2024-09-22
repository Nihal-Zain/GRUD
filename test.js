var productName= document.getElementById('productName');
var productPrice= document.getElementById('productPrice');
var productCategory= document.getElementById('productCategory');
var productDesc= document.getElementById('productDesc');
var addBtn=document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");

var productContainer=[];

if( localStorage.getItem('Products')!=null){
    productContainer=JSON.parse( localStorage.getItem("Products"));
    displayProduct(productContainer);
}
function addProduct() {
    if(validateProductName()==true){
        var product={
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDesc.value
        }
        productContainer.push(product);
        console.log(productContainer);
        localStorage.setItem("Products",JSON.stringify(productContainer));
        displayProduct(productContainer);
        clearForm();
    }
    else{
        alert('Please Enter Valid Name')
    }
}
function clearForm() {
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";
}

function displayProduct(arr) {
    var cartona=``;
    for (var i = 0; i < arr.length; i++) {
        cartona +=`<tr>
                <td>${arr[i].name}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].category}</td>
                <td>${arr[i].desc}</td>
                <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning ">UPDATE</button></td>
                <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">DELETE</button></td>
               </tr> ` ;               
    }
    document.getElementById('tBody').innerHTML=cartona;
    
}

function deleteProduct(productIndex){

    productContainer.splice(productIndex,1);
    localStorage.setItem("Products",JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function searchProdct(term){
    var matchedProducts=[];
    for (var i = 0; i < productContainer.length; i++) {
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            matchedProducts.push(productContainer[i]);
        }
    }
    displayProduct(matchedProducts);
}
var mainIndex = 0 ;
function setFormForUpdate(index){
    mainIndex = index ;
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');
    productName.value=productContainer[index].name;
    productPrice.value=productContainer[index].price;
    productCategory.value=productContainer[index].category;
    productDesc.value=productContainer[index].desc;
    updateProduct();
}

function updateProduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value
    }
    productContainer.splice(mainIndex,1,product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);      
}

function validateProductName(){
    var regex=  /^[A-Z][a-z]{3,8}$/;
    return regex.test(productName.value);
}