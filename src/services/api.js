export default async function getStudioData() {
    const response = await fetch("http://localhost:5000/items") //http://localhost:5000/items ///StudioData.json
    if (response.status == 200) {
        const data = await response.json()
        console.log(data) //pour voir si ca appelle bien le tableau dans la console de l'inspecteur 
        return data;
    } else {
        new Error(response.statusText)
    }
}

// const getStudioData = async() => {
//     const response = await fetch("http://localhost:5000/items");
//     if (response.status === 200) {
//         const newData = await response.json();
//         return newData;
//     }
// };

// export { getStudioData };


// export default async function getStudioData() {
//     const response = await fetch("http://localhost:5173/items");

//     if (!response.ok) {
//         throw new Error("Erreur lors de la récupération des studios");
//     }

//     const data = await response.json();
//     return data; // ou data.items selon ta structure
// }

// export default async function getStudioData() {
//     const response = await fetch('/StudioData.json');
//     if (!response.ok) {
//         throw new Error('Erreur lors du chargement du fichier JSON');
//     }
//     return await response.json(); // retourne un objet avec .items
// }