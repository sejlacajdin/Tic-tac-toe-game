import React from 'react';

export default function ReloadButton({onClick}){
    return (
        <button className="reload__button" onClick={onClick}>Reload game</button>
    );
};