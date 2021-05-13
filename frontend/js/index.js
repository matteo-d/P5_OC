
// Main function, auto called at load time
;(async () => {
  const products = await getProductsData()
  displayIndexHTML(products);
  displayNbsItemsInCart()
})()
