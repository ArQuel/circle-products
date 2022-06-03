async function ApiServices () {

    const datas = await fetch('https://fakestoreapi.com/products?limit=7')
    .then(res=>res.json())
    // .catch(error => alert("Les données n'ont pas pu être chargées ", error.message))
    
    
    return await datas
    
}
    
export default ApiServices