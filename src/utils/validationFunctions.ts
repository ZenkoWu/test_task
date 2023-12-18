export const validatePhone = (phone?: string) => {
    return !phone || phone.replace(/[^\d]/g, '').length < 11 
}
export const validateEmail = (email?: string) => {
    const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !email || !regular.test(email)
}

export const validateNickname = (value?: string) => {
    const regular = /^[a-zA-Zа-яА-Я0-9]+$/
    return !value || !regular.test(value)
}

export const validateName = (value?: string) => {
    const regular = /^[a-zA-Zа-яА-Я]+$/
    return !value || !regular.test(value)
}

export const validateAbout = (value?: string) => {
    return !value || value.length < 20;
}