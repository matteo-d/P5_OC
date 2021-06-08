(async () => {
  const productId = getProductId();
  const selectedProductData = await getProductsData(productId);
  displayProductHTML(selectedProductData);
  handleAddToCart(selectedProductData);
  displayNbsItemsInCart();
  handleChooseQuantity();
  setURLparam("page", 2);
})()
