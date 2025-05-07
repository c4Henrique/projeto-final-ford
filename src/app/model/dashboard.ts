export type VinInfos = {
    id: number,
    odometro: number,
    nivelCombustivel: number,
    status: string,
    lat: number,
    long: number
}

export type Vehicle = {
    id: number,
    vehicle: string,
    volumetotal: number,
    connected: number,
    softwareUpdates: number,
    img: string
}