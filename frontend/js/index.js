
(async () => {
  const products =  await getProductsData(); 
  displayIndexHTML(products);
  displayNbsItemsInCart();
})();
