// read templates
// function to replace template with our product data that takes the arguments 'temp' and 'product' to replace the temp with the product
module.exports = (temp, product) => {
  //make a variable called output and replace our template with our product.productName from array and so on
  //use a regular expression to to globally match our template names
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  // if the product is not organic replace the not organic class with organic
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  // return our output to use in our map to populate our templates
  return output;
};
