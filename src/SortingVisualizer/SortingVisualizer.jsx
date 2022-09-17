import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from './alg/sortingAlgorithm';

const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#4db5ff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'white';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
      }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    
    quickSort() {}
    
    helpSort() {}
    
    bubbleSort() {}

    render() {
        const {array} = this.state;
    
        return(
            <div>
                <div className="title-container">
                    Sorting Algorithm Visualizer
                </div>
            <button className='button-container' onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className='button-container' onClick={ () => this.quickSort()}>Quick Sort</button>
            <div className='array-container'>
            {array.map((value,idx) => (
                <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                </div>
            ))}
            </div>
            <div className="reset-container">
            <button className='reset-button' onClick={ () => this.resetArray()}>Reset Array</button>
            </div>
            <div className="sort-explanations">
                <div className="sort-explanation">
                    <h2>Merge Sort</h2>
                    <div className="explanation">
                        <p>Merge sort is a comparing-based algorithm takes an array and recursively halfs the array until it is impossible. Each element is compared 
                            and merged to a larger array until the size is of the original array. This method is also known as Divide and Conquer!
                        </p>
                    </div>
                </div>
                <div className="sort-explanation">
                    <h2>Quick Sort</h2>
                    <div className="explanation">
                        <p>Quick sort is a comparing-based algorithm takes an element in an array as a pivot, in which the array is partitioned around the pivot. This
                            algorithm is also known as Divide nd Conquer!
                        </p>
                    </div>
                </div>
            </div>
            
            </div>
            
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min + 1)+min);
}
