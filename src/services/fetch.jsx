async function ApiServices () {

    const datas = await fetch('https://fakestoreapi.com/products?limit=7')
    .then(res=>res.json())
    .catch(error => error.message)
    
    return await datas
    
}

export default ApiServices
    



