import React from 'react'

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                ></i>
                <i
                    style={{ color }}
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                ></i>
                <i
                    style={{ color }}
                    className={
                        value >= 6
                            ? 'fas fa-star'
                            : value >= 5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                ></i>
                <i
                    style={{ color }}
                    className={
                        value >=8
                            ? 'fas fa-star'
                            : value >= 7
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                ></i>
                <i
                    style={{ color }}
                    className={
                        value >= 10
                            ? 'fas fa-star'
                            : value >= 9
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                {text && text}
            </span>

        </div>
    )
}



Rating.defaultProps = {
    color: '#ffd700', 
}


export default Rating