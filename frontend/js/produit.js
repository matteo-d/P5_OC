(async () => {
  const productId = getProductId();
  verifyProductIdValidity(); 
  const selectedProductData = await getProductsData(productId);
  displayProductHTML(selectedProductData);
  handleAddToCart(selectedProductData);
  displayNbsItemsInCart();
  handleChooseQuantity();
  setURLparam ("page",2) 
})();

