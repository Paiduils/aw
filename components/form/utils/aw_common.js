const getPrepPage = function() {
  let pages =  getCurrentPages()
  return pages[pages.length -  1]
};

module.exports = { 
  getPrepPage
};