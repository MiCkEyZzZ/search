import React from 'react'
import './TabContent.scss'

export const TabContent = ({items}) => {
    return (
        <div className='container-content'>
            {items.map((obj, i) => {
                return (
                    <div
                        key={`${obj.type}_${i}`}
                    >
                        {obj.tab}
                    </div>
                )
            })}
        </div>
    )
}
