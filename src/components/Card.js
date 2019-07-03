import React from 'react';
import ReactCardFlip from 'react-card-flip';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: props.flipped,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }), () => this.props.updateLocalStorageFlipped());
  }

  render() {
    const { rows, cols, value } = this.props;
    const pctWidth = Math.floor(100/cols);
    const pctHeight = Math.floor(100/rows);
    const margin = Math.floor(Math.min(50/rows, 50/cols)) || 5;
    const verticalPadding = Math.floor(100/rows);
    const horizontalPadding = Math.floor(100/cols);
    const offset = Math.floor((pctHeight / 100) * 40);
    const flipDirection = pctHeight > pctWidth ? "horizontal" : "vertical";

    return (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection={flipDirection}
        containerStyle={{
          width: `calc(${pctWidth}vw - ${margin*2}px)`,
          height: `calc(${pctHeight}vh - ${margin*2}px - ${offset}px)`,
          boxSizing: 'content-box',
          margin,
        }}
      >
        <div
          key="front"
          style={{
            border: '1px solid gold',
            borderRadius: 4,
            padding: `${verticalPadding}px ${horizontalPadding}px`,
            height: `calc(100% - 1px)`,
          }}
          onClick={this.handleClick}
        >
          <div
            style={{
              backgroundImage: `url('https://image.flaticon.com/icons/svg/1888/1888619.svg')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: '100%',
            }}
          />
        </div>

        <div
          key="back"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gold',
            border: '1px solid gold',
            borderRadius: 4,
            color: 'rgba(0,0,0,0.8)',
            height: `calc(100% - 1px)`,
            fontSize: pctHeight * 1.5,
            padding: `${verticalPadding}px ${horizontalPadding}px`,
          }}
        >
          {value}
        </div>
      </ReactCardFlip>
    );
  }
}

export default Card;
