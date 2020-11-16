import React from 'react'
import ContentLoader from 'react-content-loader'
import './LoadingBlock.scss'

export const LoadingBlock = () => {
    return (
        <ContentLoader
            classNamw='loading-block'
            speed={0}
            width={245}
            height={218}
            viewBox="0 0 245 218"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="85" y="256" rx="2" ry="2" width="140" height="10" />
            <rect x="0" y="0" rx="0" ry="0" width="245" height="138" />
            <rect x="0" y="146" rx="0" ry="0" width="245" height="32" />
            <rect x="0" y="186" rx="0" ry="0" width="245" height="32" />
            <rect x="103" y="213" rx="0" ry="0" width="1" height="0" />
        </ContentLoader>
    )
}
