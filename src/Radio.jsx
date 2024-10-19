import React, { Component } from 'react';
import Question from './Question'; 
import Article from './Article'; 
//import {Link} from 'react-router-dom'

export default class Radioexample extends Component {
  state = {
    value: '' 
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value }); 
  }
  render() {
    const { value } = this.state;

    return (
      <div>
        <form style={{ margin: '10px', padding: '10px' }}>
          <div>
            <b>Select Post type:</b> {value}
            <div>
                <label>
                    <input
                        type='radio'
                        name='postType'
                        value='Question'
                        checked={value === 'Question'}
                        onChange={this.handleChange}
                    /> Question
                </label>
            </div>
            <div style={{ marginTop: '5px', marginBottom: '10px' }}>
                <label>
                    <input
                        type='radio'
                        name='postType'
                        value='Article'
                        checked={value === 'Article'}
                        onChange={this.handleChange}
                    /> Article
                </label>
            </div>
          </div>
        </form>
        {value === 'Question' && <Question />}
        {value === 'Article' && <Article />}
      </div>
    );
  }
}
