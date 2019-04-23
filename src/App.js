import React, { Component } from 'react';
import Title from './Title';
import Navibar from './Navibar';
import CardList from './CardList';
import './App.scss';
import nomineeList from './nomineeList.json';

class App extends Component {        
    constructor(props){
        super(props);
        this.state = {
            renderingBy: '2018',
            navibarCategoryOpacity: 0,
        };        
        this.cardListArray = [];
        this.renderingByYear = null;
        this.handleScroll = this.handleScroll.bind(this);
    }    
    handleScroll(){
        const app = document.getElementsByClassName('App')[0];
        const currentY = Math.abs(app.getBoundingClientRect().y);
        const titleDivHeight = document.getElementsByClassName('title')[0].clientHeight - document.getElementsByClassName('navibar')[0].clientHeight;
        this.setState({
            navibarCategoryOpacity: currentY / titleDivHeight - 0.2,
        });
    };
    componentDidMount(){
        this.centeringCurrentAward();        
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate(){
        this.centeringCurrentAward();
        window.addEventListener('scroll', this.handleScroll);
    };    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    centeringCurrentAward = () => {
        const title = document.getElementsByClassName('title')[0];
        const center = title.getBoundingClientRect().width / 2;
        let indexOfCenteringDiv;
        let placeholderWidth = document.getElementsByClassName('placeholder')[0].getBoundingClientRect().width;
        let awardDivWidth = [placeholderWidth,];
        let divs = document.getElementsByClassName('awardDiv');
        
        for(let i = 0; i < divs.length; i++){
            if(divs[i].children[0].classList.contains('renderingBy')){
                indexOfCenteringDiv = i;
            } 
            
            placeholderWidth += divs[i].getBoundingClientRect().width; 
            awardDivWidth.push(placeholderWidth);
        }
        awardDivWidth.push(placeholderWidth);
        title.scroll({
            left: awardDivWidth[indexOfCenteringDiv] - center + divs[indexOfCenteringDiv].getBoundingClientRect().width/2,
            behavior: "smooth"
        })
    };
    changeRenderingBy = (newRenderingBy) => {
        this.setState({
            renderingBy: newRenderingBy
        });
    };
    handleList = () => {
        let list = [];
        const renderingByYear = this.state.renderingBy.substring(0,2) === '20';
        this.renderingByYear = renderingByYear;
        if(renderingByYear){
            for (const category in nomineeList[this.state.renderingBy]) {
                list.push(
                    {
                        renderingBy: (renderingByYear) ? 'year' : 'category',
                        metaCategory: this.state.renderingBy,
                        thisCategory: category,
                        cardList: nomineeList[this.state.renderingBy][category],
                    }
                )
            }
        }else{
            for (const year in nomineeList) {
                if(nomineeList[year].hasOwnProperty(this.state.renderingBy)){
                    list.unshift(
                        {
                            renderingBy: (renderingByYear) ? 'year' : 'category',
                            metaCategory: this.state.renderingBy,
                            thisCategory: year,
                            cardList: nomineeList[year][this.state.renderingBy],
                        }
                    )
                }
            }
        }  
        this.cardListArray = list;
    };
    renderNavibar = () => {        
        return (
            <Navibar 
                renderingBy={this.state.renderingBy}
                renderingByYear={this.renderingByYear}
                navibarCategoryOpacity={this.state.navibarCategoryOpacity}
            />
        );
    };
    renderTitle = () => {
        return (
            <Title             
                changeRenderingBy={this.changeRenderingBy}
                renderingBy={this.state.renderingBy}
                renderingByYear={this.renderingByYear}
            />
        );
    };
    renderCardList = () => {
        const cardList = this.cardListArray.map((list, i) =>                         
            <CardList 
                key={i}
                changeRenderingBy={this.changeRenderingBy}
                renderingBy={list.renderingBy}
                metaCategory={list.metaCategory}
                thisCategory={list.thisCategory}
                list={list.cardList}
            />
        );                    
        return cardList;
    };    
    render() {              
        this.handleList();
        
        return (
            <div className="App">     
                {this.renderNavibar()}
                {this.renderTitle()}
                <div className='wrapper'>
                    {this.renderCardList()}
                </div>
            </div>
        );
    }
}

export default App;
