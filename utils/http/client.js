
async function HttpGetRequest(url){
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

module.exports = { HttpGetRequest };