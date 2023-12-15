import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinnner from './Spinnner';
import propsTypes from 'prop-types'



export class News extends Component {

  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category: 'genrel'
  }
  static propsTypes ={
    country: propsTypes.string,
    pageSize: propsTypes.number,
    category: propsTypes.string,
  }
  
  constructor(){
    super();
    this.state ={
      articles: [],
      loading: false,
      page:1
    }
  } 

   async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ebddf06779d84c97aa9753dca9ecdd09&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({articles: parseData.articles,
         totalResults:parseData.totalResults,
        loading: false
      })
    }

    handlePreClick = async ()=>{
      console.log("previoous button click")
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ebddf06779d84c97aa9753dca9ecdd09&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles,
        loading: false
      })
    }


    handleNextClick = async ()=>{
      console.log("Next button click")
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ebddf06779d84c97aa9753dca9ecdd09&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '40px'}}>News Application Top-Headlines</h1>
        {this.state.loading && <Spinnner />} 
        
          <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            
           return <div className='col-md-4' key={element.url}>
              <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""}  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
            </div>

            })}
            
              
          </div>

          <div className='container d-flex justify-content-between'> 
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

          </div>
      </div>
      
    )
  }
}

export default News
