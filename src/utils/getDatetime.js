
const getDatetime = (newDate) => {
    
    const day = newDate.getDate().toString().padStart(2, '0')
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const year = newDate.getFullYear();
    const hour = newDate.getHours().toString().padStart(2, '0')
    const minutes = newDate.getMinutes().toString().padStart(2, '0')
    const seconds = newDate.getSeconds().toString().padStart(2, '0')
    
    const datetime = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
    return datetime
}

module.exports = getDatetime