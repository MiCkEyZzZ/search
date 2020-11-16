import {useEffect, useState} from 'react'

export const useSaveState = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        const saveValue = window.localStorage.getItem(key)

        return saveValue !== null
        ? JSON.parse(saveValue)
        : defaultValue
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}
