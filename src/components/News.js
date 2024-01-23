import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


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
      page:1,
      totalResults:0
    }
    document.title = `NewsHub -  ${this.props.category[0].toUpperCase() + this.props.category.slice(1)}`;
  }
  async updateNews(){
    this.props.setLoading(5);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=15`
    this.setState({loading:true});

    let data = await fetch(url);
    this.props.setLoading(40);
    let parsedData = await data.json();
    this.props.setLoading(70);
    this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
        });
    this.props.setLoading(100);
  }
  async componentDidMount(){
      this.updateNews();
  }
  fetchMoreData = async()=>{
      this.setState({page:this.state.page+1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=15`
    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false
        });
  }
  render() {
    return (
      <>
        <h2 className='mb-3 text-center'>NewsHub - Top {this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<=this.state.totalResults}
          loader={<Loading></Loading>}
        >
          <div  className='container my-4 '>
        <div className="row">
        {this.state.articles.map((element)=>{
          return    <div className="col-md-4 my-3" key={element.url}>
          <NewsItem title={element.title.slice(0,40)} description={element.description===null?"":element.description.slice(0,80)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
