import _ from 'lodash'
//import faker from 'faker'
import React, { PureComponent } from 'react'
import { Search} from 'semantic-ui-react'




export default class SearchBlog extends PureComponent {
  
  constructor(props) {
      super(props)
  
      this.state = {
           isLoading: false,
           results: [],
           value: '',
           source: this.props.source
      }
    this.renderResults = this.renderResults.bind(this)
  }

  componentDidUpdate(prevProps){
      if(prevProps.source !== this.props.source){
          this.setState({source:this.props.source})
      }
  }
  

  handleResultSelect = (e, { result }) => this.setState({ value: result.titulo })

  resetState = () => {
      this.setState({
          isLoading:false,
          results: [],
      })
  }
  
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 2) return this.resetState()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.titulo)||
                                  re.test(result.contenido)||
                                  re.test(result.fecha)
      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })
    }, 500)
  }

  renderResults = results =>{
      return <div 
      onClick={() => window.location = `/blogs/${results.titulo}/${results.idBlog}`
      }
      >
         {results.cover && (
          <div key='image' className='image'>
            <img src={results.cover} alt={results.titulo} />
          </div>
        )}
        <div key='content' className='content'>
          {results.titulo && <div className='title'>{results.titulo}</div>}
          {results.fecha && <div className='description'>{results.fecha}</div>}
          
        </div>
        </div>
  }

  render() {
    return (
          <Search
            aligned={'left'}
            icon={'search'}
            size="tiny"
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={this.state.results}
            value={this.state.value}
            resultRenderer={
                results => this.renderResults(results)
            }
          />
    )
  }
}
