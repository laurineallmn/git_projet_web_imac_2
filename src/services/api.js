export default async function getItems() {
    const response = await fetch("http://localhost:5000/items")
    if (response.status == 200) {
        const data = await response.json()
        console.log(data) //pour voir si ca appelle bien le tableau dans la console de l'inspecteur 
        return data
    } else {
        new Error(response.statusText)
    }
}