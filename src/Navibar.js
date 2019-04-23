import React from 'react';
import titleString from './titleStringRef.json';
import './App.scss';

class Navibar extends React.Component {
    render(){
        const titleTxt = (this.props.renderingByYear) ?
            this.props.renderingBy : 
            titleString[this.props.renderingBy];

            let navibarStyle = {
                opacity: this.props.navibarCategoryOpacity
            };
        return (
            <div className='navibar'>
                <a 
                    href='#'
                    className='brand'
                >
                    CHIKA MUSIC AWARDS
                </a>
                <h2 style={navibarStyle}>
                    {titleTxt}
                </h2>
            </div>
        );
    };
}

export default Navibar;