export const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds / 60) % 60)
    const secs = Math.floor(seconds % 60)

    const pad = (n) =>`${n.toString().length === 1 ? '0' : ''}${n}`

    if (hours > 0) {
        return `${hours}:${pad(mins)}:${pad(secs)}`
    } else {
        return `${mins}:${pad(secs)}`
    }
}