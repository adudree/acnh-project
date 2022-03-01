export async function getFishesData() {
    const response = await fetch("https://acnhapi.com/v1/fish/")
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

export async function getOneFishData(id) {
    const response = await fetch("https://acnhapi.com/v1/fish/" + id)
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}