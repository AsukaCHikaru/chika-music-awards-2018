import React, { Component } from 'react';
import * as pics from './pics/pics';

class Name extends Component {
    renderName = () => {
        const record = this.props.record;        
        let elements = [];
        for (const key in record) {
            if (record.hasOwnProperty(key) && key !== 'imgFileName') {
                const property = record[key];
                let element;
                switch (key) {
                    case 'songName':                        
                        element = <h2 key={key} className={key}>{property}</h2>;
                        break;
                    case 'artist':
                        if(record.hasOwnProperty('songName')){
                            element = <h3 key={key} className={key}>{property}</h3>;
                        }else{
                            element = <h2 key={key} className={key}>{property}</h2>;
                        }
                        break;
                    default:
                        element = <h3 key={key} className={key}>{property}</h3>;
                        break;
                }
                if(key === 'featuring') {
                    elements.splice(1, 0, element);
                }else {
                    elements.push(element);
                }
            }
        }
        return elements;
    };
    render() {                
        return (
            <div className='recordData'>
                {this.renderName()}
            </div>
        );
    }
}

class Img extends Component {    
    render(){        
        let src = (this.props.src) ? 
            pics[this.props.src] : 
            'http://via.placeholder.com/500';
        return (            
            <div className='recordImg'>
                <img src={src} />
            </div>
        );
    }
}

class Card extends Component {    
    render() {        
        const record = this.props.record;
        return (
            <div className={record.won ? 'won recordCard' : 'recordCard'}>
                <Img 
                    src={record.imgFileName}
                />
                <Name 
                    record={record}
                /> 
            </div>
        );
    }
}

export default Card;