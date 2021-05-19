
(async () => {
  const products =  await getProductsData(); // return products 
  displayIndexHTML(products);
  displayNbsItemsInCart();
})();
