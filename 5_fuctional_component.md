# 5. Functional Component

- **Smart Component** 

  - state가 존재하는 Component

  ```react
  class MoviePoster extends Component {
      static propTypes = {
          poster: PropTypes.string.isRequired
      }
  
  	render() {
          return(
          	<img src={this.props.poster} alt="Movie Poster" />
          )
      }
  }
  ```

- **Dumb Component** 

  - state가 존재하지 않는 Component
  - 오로지 **html return만을 하기 위한 Component**를 작성할때 유용

  ```react
  function MoviePoster({poster}) {
      return (
      	<img src={poster} alt="Movie Poster" />
      )
  }
  
  MoviePoster.propTypes = {
      poster: PropTypes.string.isRequired
  }
  ```

  