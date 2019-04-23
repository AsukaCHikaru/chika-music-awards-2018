import React from 'react';
import years from './years';
import titleString from './titleStringRef.json';
import './App.scss';

class Title extends React.Component {
    constructor(props){
        super(props);
        this.awardList = [];
    }
    handleAwardList = () => {
        this.awardList = [];
        if(this.props.renderingByYear){
            this.awardList = years;
        }else{
            for (const category in titleString) {
                this.awardList.push(titleString[category])
            }
        }
    };
    renderAward = (award) => {                 
        const awardTxt = (award.indexOf(" ") === -1) ? [award,] : award.split(" ");        
        const title = awardTxt.map((sentence, i) =>        
            (i !== awardTxt.length-1) ? 
                <span key={i}>{sentence}<br/></span> : 
                <span key={i}>{sentence}</span>
        );
        const currentRenderingBy = 
            award === this.props.renderingBy ||
            award === titleString[this.props.renderingBy];
        return ( 
            <a
                href='#'
                className={(currentRenderingBy) ? "renderingBy" : ""}
                onClick={(event) => {
                    event.preventDefault();
                    let newRenderingBy;
                    if(this.props.renderingByYear){
                        newRenderingBy = award;
                    }else{
                        for (const category in titleString) {
                            if(titleString[category] === award) newRenderingBy = category;
                        }
                    }           
                    this.props.changeRenderingBy(newRenderingBy)
                }}
            >
                {title}
            </a>
        );
    };
    renderAwardList = () => {
        const awardList = this.awardList.map((award, i) => 
            <div 
                className={(this.props.renderingByYear) ?  'awardDiv year' : 'awardDiv category'}
                key={i}
            >
                {this.renderAward(award)}
            </div>
        );
        return awardList;
    };


    render() {
        this.handleAwardList();

        return (
            <div className='title'>
                <div className='placeholder'></div>
                {this.renderAwardList()}
                <div className='placeholder'></div>
            </div>                
        );
    };
}

export default Title;