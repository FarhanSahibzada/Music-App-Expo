
export const Formattime = (seconds: number) => {

    const minutes = Math.floor(seconds / 60)
    const RemaingSeconds = Math.floor(seconds % 60)

    const formattominutes = String(minutes).padStart(2,'0')
    const formattoseconds = String(RemaingSeconds).padStart(2,'0')

    return `${formattominutes}: ${formattoseconds}`

}