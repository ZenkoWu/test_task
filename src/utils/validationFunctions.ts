export const validatePhone = (phone?: string) => {
    return !phone || phone.replace(/[^\d]/g, '').length < 11 
}
export const validateEmail = (email?: string) => {
    const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !email || !regular.test(email)
}
