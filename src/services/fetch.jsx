async function ApiServices (id) {
    
    const datas = fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>console.log(json))  
    
            console.log(datas)
    return datas
    }
    
    export default ApiServices