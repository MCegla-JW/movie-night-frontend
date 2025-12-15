import './LoadingIcon.css'
import film from '../../assets/film.gif'

const LoadingIcon = () => {
  return (
    <>
    <div className="loading-icon">
      <img src={film} alt="Film reel" />
    </div>
    </>
  )
}

export default LoadingIcon