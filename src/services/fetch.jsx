/**
    * This function will fetch the datas from the FakeStoreApi and give them to the component who call it.
    * @function
*/

async function ApiServices() {

    const datas = await fetch('https://fakestoreapi.com/products?limit=7')
        .then(res => res.json())
        .catch(error => error.message)

    return await datas

}

export default ApiServices




