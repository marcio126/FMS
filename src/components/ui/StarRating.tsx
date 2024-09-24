import React from 'react';

const StarRating = ({ score }:any) => {
    // Ensure score is between 0 and 5
    const clampedScore = Math.max(0, Math.min(5, score));
    
    return (
        <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                    {index < clampedScore ? '💖' : '🤍'}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
