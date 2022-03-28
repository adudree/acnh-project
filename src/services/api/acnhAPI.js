// ===== 01 - FISHES ========================= //

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

// ===== 02 - BUGS =========================== //

export async function getBugsData() {
    const response = await fetch("https://acnhapi.com/v1/bugs/")
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

export async function getOneBugData(id) {
    const response = await fetch("https://acnhapi.com/v1/bugs/" + id)
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

// ===== 03 - CREATURES ====================== //

export async function getCreaturesData() {
    const response = await fetch("https://acnhapi.com/v1/sea/")
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

export async function getOneCreatureData(id) {
    const response = await fetch("https://acnhapi.com/v1/sea/" + id)
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

// ===== 04 - FOSSILS ======================== //

export async function getFossilsData() {
    const response = await fetch("https://acnhapi.com/v1/fossils/")
    if (response.status == 200) {
        let rep = response.json()

        return rep
    } else {
        new Error(response.statusText)
    }
}

export async function getOneFossilData(name) {
    const response = await fetch("https://acnhapi.com/v1/fossils/" + name)
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}
// ===== 05 - ART ============================ //

export async function getArtsData() {
    const response = await fetch("https://acnhapi.com/v1/art/")
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

export async function getOneArtData(id) {
    const response = await fetch("https://acnhapi.com/v1/art/" + id)
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}