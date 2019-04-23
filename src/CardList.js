import React, { Component } from 'react';
import Card from './Card';
import titleString from './titleStringRef.json';

class CardList extends Component {   
    renderCard = () => {    
        let list = [];        
        for (const key in this.props.list) {
            list.push(this.props.list[key]);
        }
        let cardList = list.map((card, i) => 
            <Card
                key={i}
                record={card}
            />
        );
        return cardList;
    };     
    renderCategoryTitle = () => {           
        if(this.props.renderingBy === 'year'){
            const title = titleString[this.props.thisCategory];
            return <h1 className=''>{title}</h1>;
        }else{
            return <h1 className=''>{this.props.thisCategory}</h1>;
        }
    };
    renderArchiveLink = () => {
        let linkTxt = 
            (this.props.renderingBy === 'year') ? 
            'SEE CATEGORY ARCHIVE' :
            `GO TO CHIKA MUSIC AWARDS ${this.props.thisCategory}`;
        return(
            <a 
                onClick={() => {
                    this.props.changeRenderingBy(this.props.thisCategory)
                }}
                href='#'
            >
                {linkTxt}
            </a>
        );
    };
    render() {
        return (                        
            <div className='cardList'>
                <div className='cardListTitleDiv'>
                    <div className='cardListTitle'>
                        {this.renderCategoryTitle()}
                    </div>
                    <div className='archive'>
                        {this.renderArchiveLink()}
                    </div>
                </div>
                {this.renderCard()}
            </div>
        );
    }
}

export default CardList;