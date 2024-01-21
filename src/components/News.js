import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country:'in',
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state = {
      articles:[],
      loading:false,
      page:1
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83d9a86f7e7c4b9a9b0ec6c96d9c4cb8&page=1&pageSize=15`
    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
        });
  }
  handleNext = async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/20))){
      this.setState({loading:true});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83d9a86f7e7c4b9a9b0ec6c96d9c4cb8&page=${this.state.page+1}&pageSize=15`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles,
      loading:false
    });
        
    }
    
  }
  handlePrev = async()=>{
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83d9a86f7e7c4b9a9b0ec6c96d9c4cb8&page=${this.state.page-1}&pageSize=15`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading: false
    });
  }
  render() {
    return (
      <div className='container my-4 '>
        <h2 className='mb-3 text-center'>NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Loading />}
        <div className="row">
        { !this.state.loading && this.state.articles.map((element)=>{
          return    <div className="col-md-4 my-3" key={element.url}>
          <NewsItem title={element.title.slice(0,40)} description={element.description===null?"":element.description.slice(0,80)} imageUrl={element.urlToImage} newsUrl={element.url}></NewsItem>
          </div>
        })}
        </div>
           <div className="container d-flex justify-content-center my-4">
           <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-2" onClick={this.handlePrev}>Previous</button>
           <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} className="btn btn-dark mx-2" onClick={this.handleNext}>Next </button>
           </div>
      </div>
    )
  }
}

export default News
