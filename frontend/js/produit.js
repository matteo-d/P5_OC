(async () => {
  const productId = getProductId();
  verifyProductIdValidity();
  const selectedProductData = await getProductsData(productId);
  displayProductHTML(selectedProductData);
  displayNbsItemsInCart();
  handleAddToCart(selectedProductData);
  handleQuantity();
  setURLparam () 
})();

