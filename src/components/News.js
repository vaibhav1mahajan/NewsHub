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

  constructor(props){
    super(props);
    this.state = {
      articles:[],
      loading:false,
      page:1
    }
    document.title = `NewsHub -  ${this.props.category[0].toUpperCase() + this.props.category.slice(1)}`;
  }
  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83d9a86f7e7c4b9a9b0ec6c96d9c4cb8&page=${this.state.page}&pageSize=15`
    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
        });
  }
  async componentDidMount(){
      this.updateNews();
  }
  handleNext = async()=>{
    this.setState({page:this.state.page+1});
    this.updateNews();
    
  }
  handlePrev = async()=>{
    this.setState({page:this.state.page-1});
    this.updateNews();
  }
  render() {
    return (
      <div className='container my-4 '>
        <h2 className='mb-3 text-center'>NewsMonkey - Top {this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        {this.state.loading && <Loading />}
        <div className="row">
        { !this.state.loading && this.state.articles.map((element)=>{
          return    <div className="col-md-4 my-3" key={element.url}>
          <NewsItem title={element.title.slice(0,40)} description={element.description===null?"":element.description.slice(0,80)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
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
