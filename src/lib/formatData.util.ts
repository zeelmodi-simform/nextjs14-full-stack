export const formatDate = (date: string) => {
    return new Date(date).toString().slice(4,16)
}