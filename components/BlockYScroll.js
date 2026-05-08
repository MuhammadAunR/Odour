import { useEffect } from 'react'

const useBlockYScroll = (isOpen) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            window.lenis?.stop()
        } else {
            document.body.style.overflow = ''
            window.lenis?.start()
        }

        return () => {
            document.body.style.overflow = ''
            window.lenis?.start()
        }
    }, [isOpen])
}

export default useBlockYScroll