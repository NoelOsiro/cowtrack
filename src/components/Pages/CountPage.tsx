'use client'
import React from 'react'
import CardDataStats from '../Cards/CardDataStats'
import CountCard from '../Cards/CountCard'
import CountDataStats from '../Cards/Counter'

function EyeSvg() {
    return (
        <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill="" />
            <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill="" />
        </svg>
    );
}

function CountSvg() {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 320 320" xmlSpace="preserve">
            <g id="XMLID_1048_">
                <circle id="XMLID_1049_" style={{ fill: "#EA348B" }} cx="70" cy="70" r="30" />
                <rect id="XMLID_1050_" x="210" y="60" style={{ fill: "#FFDA44" }} width="80" height="20" />
                <rect id="XMLID_1051_" x="30" y="150" style={{ fill: "#FFDA44" }} width="80" height="20" />
                <rect id="XMLID_1052_" x="210" y="240" style={{ fill: "#FFDA44" }} width="80" height="20" />
                <rect id="XMLID_39_" y="10" style={{ fill: "#804C09" }} width="40" height="300" />
                <rect id="XMLID_38_" x="280" y="10" style={{ fill: "#BE720D" }} width="40" height="300" />
                <path id="XMLID_1053_" style={{ fill: "#AF2768" }} d="M70,100c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1054_" style={{ fill: "#FFDA44" }} cx="130" cy="70" r="30" />
                <path id="XMLID_1055_" style={{ fill: "#FF9811" }} d="M130,100c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1056_" style={{ fill: "#00D7DF" }} cx="190" cy="70" r="30" />
                <path id="XMLID_1057_" style={{ fill: "#00A0A6" }} d="M190,100c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1058_" style={{ fill: "#EA348B" }} cx="70" cy="250" r="30" />
                <path id="XMLID_1059_" style={{ fill: "#AF2768" }} d="M70,280c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1060_" style={{ fill: "#FFDA44" }} cx="130" cy="250" r="30" />
                <path id="XMLID_1061_" style={{ fill: "#FF9811" }} d="M130,280c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1062_" style={{ fill: "#00D7DF" }} cx="190" cy="250" r="30" />
                <path id="XMLID_1063_" style={{ fill: "#00A0A6" }} d="M190,280c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1064_" style={{ fill: "#EA348B" }} cx="130" cy="160" r="30" />
                <path id="XMLID_1065_" style={{ fill: "#AF2768" }} d="M130,190c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1066_" style={{ fill: "#FFDA44" }} cx="190" cy="160" r="30" />
                <path id="XMLID_1067_" style={{ fill: "#FF9811" }} d="M190,190c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
                <circle id="XMLID_1068_" style={{ fill: "#00D7DF" }} cx="250" cy="160" r="30" />
                <path id="XMLID_1069_" style={{ fill: "#00A0A6" }} d="M250,190c-16.568,0-30-13.432-30-30s13.432-30,30-30" />
            </g>
        </svg>
    );
}

const CountGrid = () => {
    const [count, setCount] = React.useState(0)
    const [isCounting, setIsCounting] = React.useState(false)
    const [countInterval, setCountInterval] = React.useState<any>(null)

    const startCount = () => {
        setIsCounting(true)
        setCountInterval(setInterval(() => {
            setCount((prevCount) => prevCount + 1)
        }, 1000))
    }

    const stopCount = () => {
        setIsCounting(false)
        clearInterval(countInterval)
    }

    React.useEffect(() => {
        return () => {
            clearInterval(countInterval)
        }
    }, [countInterval])

    const handleClick = () => {
        if (isCounting) {
            stopCount()
        } else {
            startCount()
        }
    }

    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-9 mb-4">
            <CardDataStats title="Total count" total="2623" rate="0.43%" levelUp>
                <EyeSvg />
            </CardDataStats>
            <CountCard handleClick={handleClick} />
            {isCounting && (
                <div className="col-span-2 flex justify-center">
                    <CountDataStats title="Current count" total={`${count}`} rate="0.43%" levelUp>
                        <CountSvg />
                    </CountDataStats>
                </div>
            )}
        </div>
    )
}

export default CountGrid
