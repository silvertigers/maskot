import React from 'react'
import {connect} from 'react-redux'
import { Rating, Input, Button } from 'semantic-ui-react'
import {addReview} from '../store/product'

const mapDispatchToProps = dispatch => {
  return {
    addReview: (review, productId) => dispatch(addReview(review, productId)),

  };
};

const mapStateToProps = state => {
  return {
    user: state.user,
    review: state.review
  }
}

class ReviewForm extends React.Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleCommentsChange = this.handleCommentsChange.bind(this)
    this.state = {
      disableButtonRating: true,
      disableButtonTitle: true,
      disableButtonComments: true,
      title: '',
      comments: '',
      rating: null,
      userId: null,
      productId: null
    }
  }

  componentDidMount(){
    this.setState({
        userId: this.props.user.id,
        productId: this.props.productId
    })
  }

  handleRatingChange = (data) => {
    this.setState({
        rating: data.rating
      })
    if(data.rating){
      this.setState({
        disableButtonRating: false
      })
    } else {
      this.setState({
        disableButtonRating: true
      })
    }

  }

  handleTitleChange = (event) => {
    this.setState({
        title: event.target.value
    })
    if(event.target.value.length > 0){
      this.setState({
        disableButtonTitle: false
      })
    } else {
      this.setState({
        disableButtonTitle: true
      })
    }
  }

  handleCommentsChange = (event) => {
    this.setState({
      comments: event.target.value
    });
    if(event.target.value.length > 10){
      this.setState({
        disableButtonComments: false
      })
    } else {
      this.setState({
        disableButtonComments: true,
      })
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    var review = {
      title: this.state.title,
      rating: this.state.rating,
      comments: this.state.comments,
      userId: this.props.user.id,
      productId: Number(this.props.productId)
    }
    this.props.addReview(review, this.props.productId)
    this.setState({
      title: '',
      comments: '',
      rating: 0
    })

  }

  render(){
    console.log(this.state)
    if (this.props.user.id){return(
      <div id='reviewForm'>
        <form onSubmit={this.handleSubmit}>
          <Rating icon='star' maxRating={5} rating={this.state.rating} onRate={(evt,data)=> {this.handleRatingChange(data)}} /><br />
          <Input id='reviewTitle' name='reviewTitle' focus placeholder='Review Title' onChange={this.handleTitleChange} value={this.state.title} /><br />
          <Input focus placeholder='Comments (min 10 characters)' onChange={this.handleCommentsChange} id='reviewComments' value={this.state.comments} /> <br />
          <Button type='submit' disabled={this.state.disableButtonComments || this.state.disableButtonRating || this.state.disableButtonTitle } >Submit</Button>
        </form>
      </div>
    )}
    else {
      return null
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
